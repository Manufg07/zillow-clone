import { motion } from "framer-motion";

const Home = ({ home, account, escrowContract, buyHandler }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Section */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <img
            className="w-full rounded-lg shadow-lg"
            src={home.image}
            alt="Home"
          />
        </motion.div>

        {/* Overview Section */}
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-4">{home.name}</h1>
          <p className="text-lg mb-2">
            <strong>{home.attributes[2].value}</strong> bds |{" "}
            <strong>{home.attributes[3].value}</strong> ba |{" "}
            <strong>{home.attributes[4].value}</strong> sqft
          </p>
          <p className="text-gray-500 mb-4">{home.address}</p>
          <h2 className="text-3xl font-bold text-purple-600 mb-6">
            {home.attributes[0].value} ETH
          </h2>

          {/* Buy Button */}
          <motion.button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-4"
            onClick={() => buyHandler(home.id, home.attributes[0].value)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Buy
          </motion.button>

          <motion.button
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Contact agent
          </motion.button>
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        onClick={togglePop}
        className="absolute top-4 right-4"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img src="/path/to/close-icon.png" alt="Close" className="h-6 w-6" />
      </motion.button>
    </motion.div>
  );
};

export default Home;
