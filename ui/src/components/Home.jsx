import React from "react";
import { motion } from "framer-motion";

const Home = () => {
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

          {/* Owner or Action Buttons */}
          {owner ? (
            <div className="text-sm text-green-600 mb-6">
              Owned by {owner.slice(0, 6) + "..." + owner.slice(38, 42)}
            </div>
          ) : (
            <div>
              {account === inspector ? (
                <motion.button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mb-4"
                  onClick={inspectHandler}
                  disabled={hasInspected}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Approve Inspection
                </motion.button>
              ) : account === lender ? (
                <motion.button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4"
                  onClick={lendHandler}
                  disabled={hasLended}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Approve & Lend
                </motion.button>
              ) : account === seller ? (
                <motion.button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mb-4"
                  onClick={sellHandler}
                  disabled={hasSold}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Approve & Sell
                </motion.button>
              ) : (
                <motion.button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mb-4"
                  onClick={buyHandler}
                  disabled={hasBought}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Buy
                </motion.button>
              )}

              <motion.button
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                Contact agent
              </motion.button>
            </div>
          )}

          <hr className="my-4 border-t-2 border-gray-200" />
          <h2 className="text-xl font-bold mb-4">Overview</h2>
          <p className="text-gray-600">{home.description}</p>

          <hr className="my-4 border-t-2 border-gray-200" />
          <h2 className="text-xl font-bold mb-4">Facts and features</h2>

          {/* Facts and Features List */}
          <ul className="list-disc list-inside">
            {home.attributes.map((attribute, index) => (
              <li key={index} className="text-gray-600 mb-2">
                <strong>{attribute.trait_type}</strong> : {attribute.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <motion.button
        onClick={togglePop}
        className="absolute top-4 right-4"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        <img
          src={close}
          alt="Close"
          className="h-6 w-6 cursor-pointer hover:opacity-75"
        />
      </motion.button>
    </motion.div>
  );
};

export default Home;
