// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentVerification {

    struct Document {
        string hash;
        uint timestamp;
    }

    mapping(string => Document) public documents;

    event DocumentAdded(string hash, uint timestamp);

    function addDocumentHash(string memory _hash) public {
        documents[_hash] = Document(_hash, block.timestamp);
        emit DocumentAdded(_hash, block.timestamp);
    }

    function verifyDocumentHash(string memory _hash) public view returns (bool) {
        return documents[_hash].timestamp != 0;
    }

    function getAllHashes() public view returns (string[] memory) {
        // Simplified (not storing array for now)
        string[] memory dummy;
        return dummy;
    }
}
