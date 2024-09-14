import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Home from "./components/Home";
import RealEstateABI from "./abis/RealEstate.json"; // Replace with the correct path to your RealEstate ABI
import EscrowABI from "./abis/Escrow.json"; // Replace with the correct path to your Escrow ABI

function App({ homes, home, toggle, togglePop }) {
  // State to manage the connected MetaMask account
  const [account, setAccount] = useState(null);
  const [realEstateContract, setRealEstateContract] = useState(null);
  const [escrowContract, setEscrowContract] = useState(null);

  // Function to handle MetaMask account connection
  const connectAccount = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("MetaMask connection failed:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  // MetaMask connection and contract setup
  useEffect(() => {
    const loadContracts = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Ensure MetaMask is connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          alert("Please connect your MetaMask wallet.");
        }

        const realEstateAddress = "0xYourRealEstateContractAddress";
        const escrowAddress = "0xYourEscrowContractAddress";

        // Loading smart contracts
        const realEstate = new ethers.Contract(
          realEstateAddress,
          RealEstateABI,
          signer
        );
        const escrow = new ethers.Contract(escrowAddress, EscrowABI, signer);

        setRealEstateContract(realEstate);
        setEscrowContract(escrow);
      } catch (error) {
        console.error("Error loading contracts:", error);
      }
    };

    loadContracts();
  }, []);

  // Function to handle NFT purchase
  const buyHandler = async (nftID, purchasePrice) => {
    if (!escrowContract) {
      alert("Contracts are not loaded. Please try again later.");
      return;
    }

    try {
      const transaction = await escrowContract.depositEarnest(nftID, {
        value: ethers.utils.parseEther(purchasePrice.toString()),
      });
      await transaction.wait();
      alert("Purchase successful!");
    } catch (error) {
      console.error("Error during purchase: ", error);
      alert("Purchase failed.");
    }
  };

  return (
    <div>
      <Navigation
        account={account}
        setAccount={setAccount}
        connectAccount={connectAccount}
      />
      <Search />

      <div className="cards__section">
        <h3>Homes For You</h3>
        <hr />

        <div className="cards">
          {homes.length > 0 ? (
            homes.map((home, index) => (
              <div className="card" key={index} onClick={() => togglePop(home)}>
                <div className="card__image">
                  <img src={home.image} alt="Home" />
                </div>
                <div className="card__info">
                  <h4>{home.attributes[0].value} ETH</h4>
                  <p>
                    <strong>{home.attributes[2].value}</strong> bds |{" "}
                    <strong>{home.attributes[3].value}</strong> ba |{" "}
                    <strong>{home.attributes[4].value}</strong> sqft
                  </p>
                  <p>{home.address}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No homes available at the moment.</p>
          )}
        </div>
      </div>

      {toggle && (
        <Home
          home={home}
          account={account}
          realEstateContract={realEstateContract}
          escrowContract={escrowContract}
          buyHandler={buyHandler}
        />
      )}
    </div>
  );
}

export default App;
