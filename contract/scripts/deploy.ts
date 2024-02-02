import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const phunks = await ethers.deployContract("PhreePhilip", ['0x4dE946c3C2460c4d10Eb06B730e36512C00AAF93', '0x25a8b313C7798C7a95496ae85bE095F4613aa2A5', '0x35bfDe9cb65A010954B056c7Df26339539d5c3da']);
  const contract = await phunks.waitForDeployment();
  console.log('deployed', contract.target)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
