"use client"; // This makes it a Client Component in Next.js 13+

import { createContext, useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import dynamic from "next/dynamic";

// IPFS Configuration
const IPFS_GATEWAY_URL = "https://ipfs.io/ipfs/";
const PINATA_API_URL = "https://api.pinata.cloud";

// Dynamic imports for ABIs to avoid SSR issues
const loadABIs = async () => {
  const [
    driveAbi,
    contract2Abi,
    contract3Abi,
    contract4Abi,
    contract5Abi,
    contract6Abi,
    contract7Abi
  ] = await Promise.all([
    import("../artifacts/contracts/AgriTraceBatch.sol/AgriTraceBatch.json"),
    import("../artifacts/contracts/AgriTraceCore.sol/AgriTraceCore.json"),
    import("../artifacts/contracts/AgriTraceLib.sol/AgriTraceLib.json"),
    import("../artifacts/contracts/AgriTraceQuality.sol/AgriTraceQuality.json"),
    import("../artifacts/contracts/DamageDetectionConsumer.sol/DamageDetectionConsumer.json"),
    import("../artifacts/contracts/EmergencyManager.sol/EmergencyManager.json"),
    import("../artifacts/contracts/TemperatureOracle.sol/TemperatureOracle.json")
  ]);

  return {
    driveAbi: driveAbi.default,
    contract2Abi: contract2Abi.default,
    contract3Abi: contract3Abi.default,
    contract4Abi: contract4Abi.default,
    contract5Abi: contract5Abi.default,
    contract6Abi: contract6Abi.default,
    contract7Abi: contract7Abi.default
  };
};

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contracts: {}
  });
  const [acc, setAcc] = useState("Not connected");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [abis, setAbis] = useState(null);
  const [contractsConfig, setContractsConfig] = useState(null);
  const [ipfsLoading, setIpfsLoading] = useState(false);

  // IPFS Configuration - Using API Key and Secret
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
  const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || "";

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
    
    // Load ABIs dynamically
    loadABIs().then((loadedAbis) => {
      setAbis(loadedAbis);
      
      // Set up contracts config after ABIs are loaded
      const config = {
        drive: {
          address: "0x23d8bc46fe31F6088ed3337d863127d0Eca80B98",
          abi: loadedAbis.driveAbi.abi,
          name: "AgriTrace Batch Contract"
        },
        contract2: {
          address: "0x4791d697b2af3191E3Ff09589650f2fc8C96b7b1",
          abi: loadedAbis.contract2Abi.abi,
          name: "Contract 2"
        },
        contract3: {
          address: "0xa18AD321d13167105D3c123DA18317ba9d4ddfC9",
          abi: loadedAbis.contract3Abi.abi,
          name: "Contract 3"
        },
        contract4: {
          address: "0xF588b76226944B4657c56691209f45B84a9C392d",
          abi: loadedAbis.contract4Abi.abi,
          name: "Contract 4"
        },
        contract5: {
          address: "0x146fe66160E7886444ac5791A845203eC8a5181A",
          abi: loadedAbis.contract5Abi.abi,
          name: "Contract 5"
        },
        contract6: {
          address: "0x56880F1110c87347fB095f1c89AC14633552c5A8",
          abi: loadedAbis.contract6Abi.abi,
          name: "Contract 6"
        },
        contract7: {
          address: "0xC3731441B0BD0909ce624f705A6d39b4226C3a09",
          abi: loadedAbis.contract7Abi.abi,
          name: "Contract 7"
        }
      };
      
      setContractsConfig(config);
    });
  }, []);

  // Check if wallet was previously connected
  useEffect(() => {
    if (isClient && typeof window !== 'undefined' && window.ethereum) {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then(accounts => {
          if (accounts.length > 0 && contractsConfig) {
            // Auto-connect if previously connected
            connectWallet();
          }
        })
        .catch(console.error);
    }
  }, [isClient, contractsConfig]);

  const connectWallet = async () => {
    if (isConnecting || !isClient || !contractsConfig) return;
    
    try {
      setIsConnecting(true);
      
      if (typeof window === 'undefined' || !window.ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      // Remove existing listeners to prevent duplicates
      if (window.ethereum.removeAllListeners) {
        window.ethereum.removeAllListeners("chainChanged");
        window.ethereum.removeAllListeners("accountsChanged");
      }
      
      // Set up event listeners
      window.ethereum.on("chainChanged", (chainId) => {
        console.log("Chain changed to:", chainId);
        window.location.reload();
      });
      
      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Account changed to:", accounts[0]);
        if (accounts.length === 0) {
          // User disconnected
          setAcc("Not connected");
          setState({ provider: null, signer: null, contracts: {} });
        } else {
          window.location.reload();
        }
      });
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Initialize all contracts
      const contracts = {};
      for (const [key, config] of Object.entries(contractsConfig)) {
        try {
          contracts[key] = new ethers.Contract(
            config.address, 
            config.abi, 
            signer
          );
        } catch (contractError) {
          console.error(`Error creating contract ${key}:`, contractError);
        }
      }
      
      setAcc(accounts[0]);
      setState({ provider, signer, contracts });
      
      // Optional: Store connection state in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('walletConnected', 'true');
      }
      
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAcc("Not connected");
    setState({ provider: null, signer: null, contracts: {} });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('walletConnected');
    }
  };

  // IPFS Functions

  /**
   * Upload any JSON data to IPFS
   * @param {Object} jsonData - The JSON data to upload (form fields, etc.)
   * @param {string} fileName - Optional filename for the upload
   * @returns {Promise<{hash: string, url: string}>} - Returns IPFS hash and gateway URL
   */
  const uploadJsonToIPFS = async (jsonData, fileName = null) => {
    if (!jsonData) {
      throw new Error("No data provided for IPFS upload");
    }

    try {
      setIpfsLoading(true);

      // Prepare data with metadata
      const dataToUpload = {
        timestamp: new Date().toISOString(),
        walletAddress: acc !== "Not connected" ? acc : null,
        ...jsonData
      };

      // Generate filename if not provided
      const finalFileName = fileName || `data-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.json`;

      // Check if we have Pinata API credentials
      if (PINATA_API_KEY && PINATA_SECRET_API_KEY) {
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(dataToUpload, null, 2)], {
          type: 'application/json'
        });
        
        formData.append('file', blob, finalFileName);
        
        const metadata = JSON.stringify({
          name: finalFileName,
          keyvalues: {
            walletAddress: acc !== "Not connected" ? acc : 'anonymous',
            uploadedAt: new Date().toISOString()
          }
        });
        formData.append('pinataMetadata', metadata);

        const options = JSON.stringify({
          cidVersion: 0,
        });
        formData.append('pinataOptions', options);

        const response = await fetch(`${PINATA_API_URL}/pinning/pinFileToIPFS`, {
          method: 'POST',
          headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_API_KEY,
          },
          body: formData
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Pinata upload failed: ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        const ipfsHash = result.IpfsHash;
        const ipfsUrl = `${IPFS_GATEWAY_URL}${ipfsHash}`;

        console.log("Data uploaded to IPFS:", { hash: ipfsHash, url: ipfsUrl });
        return { hash: ipfsHash, url: ipfsUrl };
      }

      // Fallback method for development/testing (when no Pinata credentials)
      else {
        console.warn("No Pinata API credentials found. Using fallback method.");
        
        const mockHash = "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const mockUrl = `${IPFS_GATEWAY_URL}${mockHash}`;
        
        // Store in localStorage as fallback
        if (typeof window !== 'undefined') {
          localStorage.setItem(`ipfs_mock_${mockHash}`, JSON.stringify(dataToUpload));
        }
        
        return { hash: mockHash, url: mockUrl, mock: true };
      }

    } catch (error) {
      console.error("IPFS upload error:", error);
      throw new Error(`Failed to upload to IPFS: ${error.message}`);
    } finally {
      setIpfsLoading(false);
    }
  };

  /**
   * Fetch JSON data from IPFS using hash
   * @param {string} ipfsHash - The IPFS hash to fetch
   * @returns {Promise<Object>} - Returns the JSON data
   */
  const retrieveJsonFromIPFS = async (ipfsHash) => {
    if (!ipfsHash) {
      throw new Error("No IPFS hash provided");
    }

    try {
      setIpfsLoading(true);

      // Check if it's a mock hash (fallback method)
      if (typeof window !== 'undefined') {
        const mockData = localStorage.getItem(`ipfs_mock_${ipfsHash}`);
        if (mockData) {
          return JSON.parse(mockData);
        }
      }

      // Fetch from IPFS gateway
      const response = await fetch(`${IPFS_GATEWAY_URL}${ipfsHash}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Data fetched from IPFS:", data);
      
      return data;

    } catch (error) {
      console.error("IPFS fetch error:", error);
      throw new Error(`Failed to fetch from IPFS: ${error.message}`);
    } finally {
      setIpfsLoading(false);
    }
  };

  // Helper function to get a specific contract
  const getContract = (contractName) => {
    return state.contracts[contractName] || null;
  };

  // Helper function to check if wallet is connected
  const isConnected = () => {
    return acc !== "Not connected" && state.provider !== null;
  };

  // Helper function to get contract info
  const getContractInfo = (contractName) => {
    return contractsConfig ? contractsConfig[contractName] || null : null;
  };

  // Helper function to get all available contract names
  const getAvailableContracts = () => {
    return contractsConfig ? Object.keys(contractsConfig) : [];
  };

  // Helper function to get network info
  const getNetworkInfo = async () => {
    if (state.provider) {
      const network = await state.provider.getNetwork();
      return network;
    }
    return null;
  };

  // Don't render on server side to avoid hydration mismatch
  if (!isClient) {
    return (
      <DataContext.Provider value={{ 
        state: { provider: null, signer: null, contracts: {} }, 
        acc: "Not connected", 
        connectWallet: () => {},
        disconnectWallet: () => {},
        getContract: () => null,
        isConnected: () => false,
        getContractInfo: () => null,
        getAvailableContracts: () => [],
        getNetworkInfo: () => null,
        isConnecting: false,
        contracts: {},
        // IPFS functions
        uploadJsonToIPFS: () => Promise.reject(new Error("Not on client side")),
        retrieveJsonFromIPFS: () => Promise.reject(new Error("Not on client side")),
        ipfsLoading: false
      }}>
        {children}
      </DataContext.Provider>
    );
  }

  return (
    <DataContext.Provider value={{ 
      state, 
      acc, 
      connectWallet,
      disconnectWallet,
      getContract,
      isConnected,
      getContractInfo,
      getAvailableContracts,
      getNetworkInfo,
      isConnecting,
      contracts: state.contracts,
      // IPFS functions - just two simple functions
      uploadJsonToIPFS,      // Upload any JSON data (form fields, etc.)
      retrieveJsonFromIPFS,  // Retrieve JSON data by hash
      ipfsLoading
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Create a custom hook for easier usage
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

// Export a dynamic version to prevent SSR issues
export default dynamic(() => Promise.resolve(DataProvider), {
  ssr: false
});