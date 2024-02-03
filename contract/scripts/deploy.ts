import { ethers } from "hardhat";

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const phunks = await ethers.deployContract("PhreePhilip", 
  ['0x35bfDe9cb65A010954B056c7Df26339539d5c3da', '0x25a8b313C7798C7a95496ae85bE095F4613aa2A5', '0x35bfDe9cb65A010954B056c7Df26339539d5c3da'], {
    maxFeePerGas: ethers.parseUnits('20', 'gwei'),
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei'),
  });
  // 1,098,409
  const contract = await phunks.waitForDeployment();
  
  console.log('deployed', contract.target)
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
