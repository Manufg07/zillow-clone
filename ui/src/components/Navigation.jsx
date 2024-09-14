import { useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

const Navigation = ({ account, setAccount }) => {
  // State to manage loading status for the button
  const [loading, setLoading] = useState(false);

  // Function to connect to MetaMask
  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        setLoading(true); // Start loading
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        setAccount(account); // Set the account state
      } else {
        alert("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
    } finally {
      setLoading(false); // Stop loading after connection attempt
    }
  };

  // Check if MetaMask is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          const account = ethers.utils.getAddress(accounts[0]);
          setAccount(account); // Set the account state
        }
      }
    };
    checkConnection();
  }, [setAccount]);

  return (
    <motion.nav
      className="grid grid-cols-3 items-center py-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navigation Links */}
      <ul className="flex justify-center space-x-6 text-lg">
        {["Buy", "Rent", "Sell"].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1, color: "#7e22ce" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <a href="#" className="hover:text-purple-600">
              {item}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* Logo and Brand Name */}
      <motion.div
        className="flex justify-center items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={logo} alt="Logo" className="w-20 h-auto mr-2" />
        <motion.h1
          className="text-3xl font-bold text-purple-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Zillow
        </motion.h1>
      </motion.div>

      {/* Connect Wallet Button or Account Address */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center"
      >
        {account ? (
          // Display connected account address
          <div className="w-44 h-12 bg-purple-600 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300">
            {account.slice(0, 6) + "..." + account.slice(-4)}
          </div>
        ) : (
          // Display connect button when no account is connected
          <button
            type="button"
            className="w-44 h-12 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
            onClick={connectHandler}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Connecting..." : "Connect"}
          </button>
        )}
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
