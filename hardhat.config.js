require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/aa5dac7082944ce89be0e5b4e458b14c",
      accounts: [process.env.private_key],
    },
  },
  solidity: "0.8.17",
};
