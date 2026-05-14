// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        string hash;
        uint timestamp;
    }

    mapping(string => Document) public documents;

    function storeDocument(string memory _hash) public {
        documents[_hash] = Document(_hash, block.timestamp);
    }

    function verifyDocument(string memory _hash) public view returns (bool) {
        return documents[_hash].timestamp != 0;
    }
}
