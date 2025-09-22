"use client";

import { useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { Boxes } from "@/components/shadcn/ui/shadcn-io/background-boxes";
import { cn } from "@/lib/utils";
import { Sparkles, Sprout, Shield, Wallet } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/authSlice";
import { DataContext } from "../../context/Context.jsx";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Use the DataContext with IPFS functions
  const { 
    state, 
    acc, 
    connectWallet, 
    isConnected, 
    getContract, 
    isConnecting,
    uploadJsonToIPFS,
    ipfsLoading
  } = useContext(DataContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("1"); // Default to FARMER (1)
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already registered when wallet connects
  const checkUserRegistration = useCallback(async () => {
    try {
      const coreContract = getContract('contract2'); // AgriTraceCore contract
      if (!coreContract) return;

      const userRole = await coreContract.roles(acc);
      
      if (userRole !== 0) { // 0 = NONE, user is already registered
        // User is registered, redirect to appropriate role page
        const roleNames = ['', 'farmer', 'distributor', 'retailer', 'admin'];
        const roleName = roleNames[Number(userRole)];
        
        if (roleName && roleName !== 'admin') {
          router.push(`/${roleName}`);
          return;
        }
      }
    } catch (error) {
      console.error('Error checking user registration:', error);
    }
  }, [getContract, acc, router]);

  // Extract isConnected value to a stable variable
  const walletConnected = isConnected();

  useEffect(() => {
    if (walletConnected && state.contracts.contract2) {
      checkUserRegistration();
    }
  }, [walletConnected, state.contracts.contract2, checkUserRegistration]);

  const handleRegister = async () => {
    if (!walletConnected) {
      alert("Please connect your wallet first");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const coreContract = getContract('contract2'); // AgriTraceCore contract
    if (!coreContract) {
      alert("Contract not initialized. Please reconnect your wallet.");
      return;
    }

    try {
      setIsLoading(true);

      // Step 1: Call blockchain function first with a temporary placeholder
      console.log("Step 1: Registering user on blockchain...");
      const tempIpfsHash = "pending"; // Placeholder hash
      const tx = await coreContract.registerUser(parseInt(role), tempIpfsHash);
      
      // Wait for transaction confirmation
      await tx.wait();
      console.log("Blockchain registration successful!");

      // Step 2: Now upload user data to IPFS
      console.log("Step 2: Uploading user data to IPFS...");
      const userData = {
        name,
        email,
        password, // Note: In production, you should hash the password before storing
        role: getRoleName(parseInt(role)),
        registrationTime: new Date().toISOString(),
        walletAddress: acc,
        blockchainRegistered: true,
        transactionHash: tx.hash
      };

      // Upload to IPFS using the context function
      const { hash: ipfsHash } = await uploadJsonToIPFS(userData, `user-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`);
      
      console.log("User data uploaded to IPFS with hash:", ipfsHash);

      // Step 3: Update blockchain with actual IPFS hash (if your contract supports updating)
      // Note: This step depends on whether your smart contract has an update function
      try {
        if (coreContract.updateUserIpfsHash) {
          console.log("Step 3: Updating blockchain with IPFS hash...");
          const updateTx = await coreContract.updateUserIpfsHash(acc, ipfsHash);
          await updateTx.wait();
          console.log("IPFS hash updated on blockchain!");
        }
      } catch {
        console.log("Note: Contract doesn't support IPFS hash updates, continuing...");
        // This is not a critical error - the user is still registered
      }

      // Set user data in Redux store
      const userDataForStore = {
        name,
        email,
        role: getRoleName(parseInt(role)),
        walletAddress: acc,
        signupTime: new Date().toISOString(),
        ipfsHash, // Store the IPFS hash for future reference
        transactionHash: tx.hash
      };
      
      dispatch(setUser(userDataForStore));

      alert("Registration successful! Welcome to VeriCrop.");

      // Redirect to role-specific page
      const roleNames = ['', 'farmer', 'distributor', 'retailer', 'admin'];
      const roleName = roleNames[parseInt(role)];
      router.push(`/${roleName}`);

    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleName = (roleId: number): string => {
    const roleNames = ['none', 'farmer', 'distributor', 'retailer', 'admin'];
    return roleNames[roleId] || 'unknown';
  };

  return (
    <div
      className={cn(
        "min-h-screen relative w-full overflow-hidden",
        "bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50"
      )}
    >
      {/* Background Boxes */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Boxes />
        <div
          className={cn(
            "absolute inset-0 bg-emerald-950/90 z-10",
            "[mask-image:radial-gradient(circle,transparent_10%,white_90%)] pointer-events-none"
          )}
        />
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-20">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Branding */}
          <div className="space-y-8 text-center lg:text-left relative">
            <div className="relative p-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-3xl blur opacity-20 animate-pulse"></div>
              <div className="relative space-y-8">
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300 overflow-hidden">
                      <Image
                        src="/original_logo.png"
                        alt="VeriCrop Logo"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h1
                    className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 bg-clip-text text-transparent"
                    style={{ fontFamily: "Epunda Slab" }}
                  >
                    VeriCrop
                  </h1>
                </div>
                <div className="space-y-6">
                  <h2
                    className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent"
                    style={{ fontFamily: "Epunda Slab" }}
                  >
                    Join Sustainable Farming
                  </h2>
                  <p className="text-xl text-slate-700 max-w-lg leading-relaxed">
                    Connect your wallet and start your journey with VeriCrop.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="flex items-center space-x-3 p-4 bg-emerald-100/50 rounded-2xl backdrop-blur-sm border border-emerald-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                      <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-emerald-700">
                        Carbon Neutral
                      </div>
                      <div className="text-xs text-emerald-600">100% Green</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-green-100/50 rounded-2xl backdrop-blur-sm border border-green-200/50">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-lime-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-green-700">
                        Certified Organic
                      </div>
                      <div className="text-xs text-green-600">
                        Trusted Quality
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register/Connect Wallet Card */}
          <div className="w-full max-w-md mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity duration-500 animate-pulse"></div>
              <Card className="relative shadow-2xl border-0 bg-white/95 backdrop-blur-2xl rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white/10 to-green-50/50"></div>
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                </div>
                <div className="relative z-10">
                  <CardHeader className="space-y-2 text-center pt-10">
                    <CardTitle className="text-4xl font-bold text-slate-800">
                      {!isConnected() ? "Connect Wallet" : "Create Account"}
                    </CardTitle>
                    <CardDescription className="text-slate-600 text-lg">
                      {!isConnected() 
                        ? "Connect your wallet to get started" 
                        : "Register for your VeriCrop account"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 px-10 pb-10">
                    {!walletConnected ? (
                      // Wallet Connection UI
                      <div className="space-y-6">
                        <div className="text-center">
                          <Wallet className="w-16 h-16 mx-auto text-emerald-600 mb-4" />
                          <p className="text-slate-600 mb-6">
                            Connect your MetaMask wallet to continue
                          </p>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
                          onClick={connectWallet}
                          disabled={isConnecting}
                        >
                          {isConnecting ? "Connecting..." : "Connect Wallet"}
                        </Button>
                      </div>
                    ) : (
                      // Registration Form
                      <div className="space-y-6">
                        <div className="text-center p-3 bg-emerald-100 rounded-lg">
                          <p className="text-sm text-emerald-700">
                            Wallet Connected: {acc.slice(0, 6)}...{acc.slice(-4)}
                          </p>
                        </div>
                        
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            disabled={isLoading || ipfsLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            disabled={isLoading || ipfsLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading || ipfsLoading}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            disabled={isLoading || ipfsLoading}
                          />
                          <div className="flex items-center mt-3 px-2">
                            <input
                              id="showPassword"
                              type="checkbox"
                              checked={showPassword}
                              onChange={(e) => setShowPassword(e.target.checked)}
                              className="w-4 h-4 accent-emerald-600 cursor-pointer mr-2"
                              disabled={isLoading || ipfsLoading}
                            />
                            <Label
                              htmlFor="showPassword"
                              className="text-sm text-slate-600 cursor-pointer"
                            >
                              Show password
                            </Label>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Role</Label>
                          <Select 
                            value={role} 
                            onValueChange={setRole}
                            disabled={isLoading || ipfsLoading}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Farmer</SelectItem>
                              <SelectItem value="2">Distributor</SelectItem>
                              <SelectItem value="3">Retailer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <Button
                          className="w-full mt-6 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
                          onClick={handleRegister}
                          disabled={isLoading || ipfsLoading}
                        >
                          {isLoading && !ipfsLoading ? "Registering on Blockchain..." :
                           ipfsLoading ? "Uploading to IPFS..." : 
                           "Register on Blockchain"}
                        </Button>
                        
                        {(isLoading || ipfsLoading) && (
                          <div className="text-center text-sm text-slate-600">
                            {isLoading && !ipfsLoading && "⛓️ Step 1: Processing blockchain registration..."}
                            {ipfsLoading && "⏳ Step 2: Uploading data to IPFS..."}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}