async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy RealEstate contract
  const RealEstate = await ethers.getContractFactory("RealEstate");
  const realEstate = await RealEstate.deploy();
  console.log("RealEstate contract deployed to:", realEstate.address);

  // Define the arguments for the Escrow contract
  const nftAddress = realEstate.address; // Use the address of the deployed RealEstate contract
  const seller = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 "; 
  const inspector = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8 "; 
  const lender = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; 

  // Deploy Escrow contract with arguments
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(nftAddress, seller, inspector, lender);
  console.log("Escrow contract deployed to:", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
