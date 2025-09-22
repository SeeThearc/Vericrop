"use client";
import RegisterProductPage from "./register-product/page";
import TrackProductsPage from "./track-products/page";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { motion } from "framer-motion";
import { useState, useEffect, useContext, useCallback } from "react";
import Image from "next/image";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/ui/tabs";
import { Package2, BarChart3, Plus } from "lucide-react";
import { FarmerWelcomeBanner } from "@/components/farmer/farmer-welcome-banner";
import { SalesChart } from "@/components/farmer/sales-chart";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { DataContext } from "../../context/Context.jsx";

interface UserDetails {
  role: number;
  farmerReputation: number;
  distributorReputation: number;
  retailerReputation: number;
  detailsHash: string;
}

interface UserData {
  name: string;
  email: string;
  walletAddress: string;
  registrationTime: string;
  // Add other fields as needed
}

const FarmerPage = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get DataContext functions
  const {
    state,
    acc,
    isConnected,
    getContract,
    retrieveJsonFromIPFS,
    ipfsLoading
  } = useContext(DataContext);

  const fetchUserDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const coreContract = getContract('contract2'); // AgriTraceCore contract
      if (!coreContract) {
        throw new Error("Contract not initialized");
      }

      console.log("Fetching user details for address:", acc);

      // Call getUserDetails function from smart contract
      const details = await coreContract.getUserDetails(acc);
      
      const userDetails: UserDetails = {
        role: Number(details[0]),
        farmerReputation: Number(details[1]),
        distributorReputation: Number(details[2]),
        retailerReputation: Number(details[3]),
        detailsHash: details[4]
      };

      console.log("User details from blockchain:", userDetails);
      setUserDetails(userDetails);

      // If there's a details hash, fetch data from IPFS
      if (userDetails.detailsHash && userDetails.detailsHash !== "" && userDetails.detailsHash !== "pending") {
        console.log("Fetching user data from IPFS with hash:", userDetails.detailsHash);
        
        try {
          const ipfsData = await retrieveJsonFromIPFS(userDetails.detailsHash);
          console.log("User data from IPFS:", ipfsData);
          setUserData(ipfsData);
        } catch (ipfsError) {
          console.error("Error fetching data from IPFS:", ipfsError);
          // Continue without IPFS data - user details from blockchain are still available
          setUserData({
            name: "Unknown User",
            email: "",
            walletAddress: acc,
            registrationTime: ""
          });
        }
      } else {
        console.log("No IPFS hash available or hash is pending");
        // Set default user data if no IPFS hash
        setUserData({
          name: "Unknown User",
          email: "",
          walletAddress: acc,
          registrationTime: ""
        });
      }

    } catch (error) {
      console.error("Error fetching user details:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch user details");
    } finally {
      setIsLoading(false);
    }
  }, [acc, getContract, retrieveJsonFromIPFS, setIsLoading, setError, setUserDetails, setUserData]);

  // Fetch user details when component mounts or wallet changes
  useEffect(() => {
    if (isConnected() && acc && state.contracts.contract2) {
      fetchUserDetails();
    }
  }, [isConnected, acc, state.contracts.contract2, fetchUserDetails]);

  // Function to get role name
  const getRoleName = (roleId: number): string => {
    const roleNames = ['none', 'farmer', 'distributor', 'retailer', 'admin'];
    return roleNames[roleId] || 'unknown';
  };

  // Show loading state
  if (isLoading || ipfsLoading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <Image
            src="/parallex.png"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        </div>
        <BackgroundBeams className="fixed inset-0 z-5" />
        <div className="relative z-10 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading user details...</p>
            {ipfsLoading && <p className="text-white/70 text-sm mt-2">Fetching data from IPFS...</p>}
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <Image
            src="/parallex.png"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        </div>
        <BackgroundBeams className="fixed inset-0 z-5" />
        <div className="relative z-10 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <p className="text-red-400 text-lg mb-4">Error: {error}</p>
            <button 
              onClick={fetchUserDetails}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show wallet not connected state
  if (!isConnected()) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="fixed inset-0 z-0">
          <Image
            src="/parallex.png"
            alt="Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
        </div>
        <BackgroundBeams className="fixed inset-0 z-5" />
        <div className="relative z-10 text-center">
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-8 border border-white/20">
            <p className="text-white text-lg">Please connect your wallet to continue</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Single Blur */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/parallex.png"
          alt="Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      </div>

      {/* Background Beams */}
      <BackgroundBeams className="fixed inset-0 z-5" />

      <div className="relative z-10 max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        {/* Pass user data as props to FarmerWelcomeBanner */}
        <FarmerWelcomeBanner 
          name={userData?.name || "Unknown User"}
          address={acc}
          farmerReputation={userDetails?.farmerReputation || 0}
          distributorReputation={userDetails?.distributorReputation || 0}
          retailerReputation={userDetails?.retailerReputation || 0}
          role={getRoleName(userDetails?.role || 0)}
          email={userData?.email || ""}
          registrationTime={userData?.registrationTime || ""}
        />

        {/* Floating Navigation Tabs with Glass Morphism */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="backdrop-blur-md bg-white/5 rounded-2xl p-2 shadow-lg border border-white/20"
        >
          <div className="backdrop-blur-md bg-white/10 rounded-2xl p-2 shadow-lg border border-white/20">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 bg-transparent gap-2">
                <TabsTrigger
                  value="register"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <Plus className="h-4 w-4" />
                  Register Product
                </TabsTrigger>
                <TabsTrigger
                  value="track"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <Package2 className="h-4 w-4" />
                  Track Products
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex items-center gap-2 bg-white/10 data-[state=active]:bg-white/20 data-[state=active]:text-white text-white/80 border-0 rounded-xl transition-all duration-200 hover:bg-white/20"
                >
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="register" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <RegisterProductPage />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="track" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <TrackProductsPage />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <Card className="border-white/20 shadow-lg bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden">
                      <CardContent className="p-0">
                        <SalesChart />
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerPage;