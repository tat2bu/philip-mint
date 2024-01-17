// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721, ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Phunk is ERC721Enumerable {
    uint256 private _nextTokenId;

    constructor() ERC721("PHUNK", "PHUNK") {}

    function _baseURI() internal pure override returns (string memory) {
        return "http://test.test";
    }

    function mint()
        public
        returns (uint256)
    {
        uint256 tokenId = _nextTokenId++;
        _mint(msg.sender, tokenId);

        return tokenId;
    }
}