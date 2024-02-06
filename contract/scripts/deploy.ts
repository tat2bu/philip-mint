import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const treasuryWallet = '0x35bfDe9cb65A010954B056c7Df26339539d5c3da'
  const erc721contract = '0x25a8b313C7798C7a95496ae85bE095F4613aa2A5'
  const owner = '0x35bfDe9cb65A010954B056c7Df26339539d5c3da'
  const phunks = await ethers.deployContract("PhreePhilip", 
  [owner, erc721contract, treasuryWallet], {
    maxFeePerGas: ethers.parseUnits('20', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
  });
  const contract = await phunks.waitForDeployment();
  console.log('deployed', contract.target)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
