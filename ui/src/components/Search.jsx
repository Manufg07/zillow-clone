import { motion } from "framer-motion";
import img from "../assets/BG.jpeg";

const Search = () => {
  return (
    <header
      className="bg-cover bg-center h-[40vh] relative flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Animated Header Text */}
      <motion.h2
        className="text-white text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Search it. Explore it. Buy it.
      </motion.h2>

      {/* Animated Search Input */}
      <motion.input
        type="text"
        className="p-4 w-4/5 max-w-lg rounded-lg text-lg font-semibold shadow-lg placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter an address, neighborhood, city, or ZIP code"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileFocus={{ scale: 1.05 }}
      />
    </header>
  );
};

export default Search;
