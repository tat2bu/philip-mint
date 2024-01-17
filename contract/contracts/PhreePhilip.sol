// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPhunkToken.sol";
import "hardhat/console.sol";

contract PhreePhilip {
    address erc721contract;
    address treasuryWallet;

    constructor(address contractAddr, address treasuryWalletAddr) {
        erc721contract = contractAddr;
        treasuryWallet = treasuryWalletAddr;
    }

    function mint() public {
        // address tokenOwner = IERC721(erc721contract).ownerOf(tokenId);
        // require(msg.sender == tokenOwner);
        IPhunksToken philip = IPhunksToken(erc721contract);
        uint treasuryBalance = philip.balanceOf(treasuryWallet);
        uint randomIndex = _getRand() % treasuryBalance;
        uint phunkId = philip.tokenOfOwnerByIndex(treasuryWallet, randomIndex);
        philip.transferFrom(treasuryWallet, msg.sender, phunkId);
    }

    function _getRand() internal view returns(uint256) {
        uint256 randNum = uint256(keccak256(abi.encodePacked(block.timestamp + block.difficulty +  
        ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) + block.number)));
        
        return randNum;
    }

    function getRandomPhunks() public view returns(uint) {
        IPhunksToken philip = IPhunksToken(erc721contract);
        uint treasuryBalance = philip.balanceOf(treasuryWallet);
        uint randomIndex = _getRand() % treasuryBalance;

        uint phunkId = philip.tokenOfOwnerByIndex(treasuryWallet, randomIndex);
        return phunkId;
    }
}