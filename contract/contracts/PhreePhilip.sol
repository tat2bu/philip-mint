// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPhunkToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract PhreePhilip is Ownable {
    address erc721contract;
    address treasuryWallet;
    
    uint private claimRound = 1;
    mapping(uint => mapping(address => bool)) private claims;

    bytes32 public merkleRoot = 0xa9b170e2aaa61cc4dab50771bd7bd8c69c4358e9ee216571a64ff1a36708ca52;

    event PhilipMinted(uint256 indexed tokenId, address indexed destination);

    constructor(address initialOwner, address contractAddr, address treasuryWalletAddr) Ownable(initialOwner) {
        erc721contract = contractAddr;
        treasuryWallet = treasuryWalletAddr;
    }

    function mint(bytes32[] memory proof) public returns(uint) {
        require(!claims[claimRound][msg.sender], "Already claimed");
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof.");
        
        IPhunksToken philip = IPhunksToken(erc721contract);
        uint treasuryBalance = philip.balanceOf(treasuryWallet);
        uint randomIndex = _getRand() % treasuryBalance;
        uint phunkId = philip.tokenOfOwnerByIndex(treasuryWallet, randomIndex);
        
        emit PhilipMinted(phunkId, msg.sender);
        claims[claimRound][msg.sender] = true;
        philip.transferFrom(treasuryWallet, msg.sender, phunkId);
        return phunkId;
    }

    function _getRand() internal view returns(uint256) {
        uint256 randNum = uint256(keccak256(abi.encodePacked(block.timestamp + block.prevrandao +  
        ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) + block.number)));
        
        return randNum;
    }

    function setMerkleRoot(bytes32 root) public onlyOwner {
        merkleRoot = root;
        claimRound++;
    }

}