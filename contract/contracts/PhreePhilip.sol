// Stay Phree, stay Phunky
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IPhunkToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract PhreePhilip is Ownable, ReentrancyGuard {
    address erc721contract;
    address treasuryWallet;
    
    uint private claimRound = 1;
    mapping(uint => mapping(address => bool)) private claims;
    bool private mintDisabled = false;

    bytes32 private merkleRoot = 0x3c91d7badd79187edd1fe30bca37ca355ec2fe12ae6af2582a10092c5fd70cae;

    event PhilipPhreed(uint256 indexed tokenId, address indexed destination);

    constructor(address initialOwner, address contractAddr, address treasuryWalletAddr) Ownable(initialOwner) {
        erc721contract = contractAddr;
        treasuryWallet = treasuryWalletAddr;
    }

    function mint(bytes32[] memory proof) public nonReentrant returns(uint) {
        require(!mintDisabled, "Mint temporaly disabled");
        require(!claims[claimRound][msg.sender], "Already claimed");
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender))));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid proof.");
        
        IPhunksToken philip = IPhunksToken(erc721contract);
        uint treasuryBalance = philip.balanceOf(treasuryWallet);
        uint randomIndex = _getRand() % treasuryBalance;
        uint phunkId = philip.tokenOfOwnerByIndex(treasuryWallet, randomIndex);
        if (phunkId == 8348) {
            require(treasuryBalance > 1, "No more Philip available.");
            uint nextIndex = (randomIndex + 1) % treasuryBalance;
            phunkId = philip.tokenOfOwnerByIndex(treasuryWallet, nextIndex);
        }
        
        emit PhilipPhreed(phunkId, msg.sender);
        claims[claimRound][msg.sender] = true;
        philip.transferFrom(treasuryWallet, msg.sender, phunkId);
        return phunkId;
    }

    function _getRand() internal view returns(uint256) {
        uint256 randNum = uint256(keccak256(abi.encodePacked(block.timestamp + block.prevrandao +  
            ((uint256(keccak256(abi.encodePacked(msg.sender)))) / (block.timestamp)) + block.number)));
        return randNum;
    }

    function setContractAddress(address contractAddress) public onlyOwner {
        erc721contract = contractAddress;
    }

    function setMintDisabled(bool disabled) public onlyOwner {
        mintDisabled = disabled;
    }

    function setTreasuryWallet(address wallet) public onlyOwner {
        treasuryWallet = wallet;
    }

    function setMerkleRoot(bytes32 root) public onlyOwner {
        merkleRoot = root;
        claimRound++;
    }

}