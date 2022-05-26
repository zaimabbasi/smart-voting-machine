// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct PoliticalParty {
        string name;
        string symbol;
        string flagUrl;
        string imageUrl;
    }

    PoliticalParty[] public politicalParties;
    uint256 public startTime;
    uint256 public endTime;
    mapping(uint256 => uint256) partyVoteCount;
    mapping(address => bool) citizenVoted;
    mapping(address => uint256) citizenVotedParty;

    constructor(uint256 _startTime, uint256 _endTime) {
        startTime = _startTime;
        endTime = _endTime;
    }

    modifier onlyOnce {
        require(citizenVoted[msg.sender] == false, "Can vote only once!");
        _;
    }

    modifier whileVoting {
        require(block.timestamp >= startTime, "Voting has not started!");
        require(block.timestamp < endTime, "Voting time is over!");
        _;
    }

    modifier validPartyId(uint256 _partyId) {
        require(_partyId < politicalParties.length, "Party ID is invalid!");
        _;
    }

    modifier votingComplete {
        require(block.timestamp >= startTime, "Voting has not started!");
        require(block.timestamp >= endTime, "Voting time is not over!");
        _;
    }

    function viewResults() external view votingComplete returns (uint256[] memory) {
        uint256[] memory results = new uint256[](politicalParties.length);

        for (uint256 i = 0; i < politicalParties.length; i++)
            results[i] = partyVoteCount[i];

        return results;
    }

    function addParty(
        string memory _name,
        string memory _symbol,
        string memory _flagUrl,
        string memory _imageUrl
    )
        external
        onlyOwner
    {
        PoliticalParty memory party = PoliticalParty(_name, _symbol, _flagUrl, _imageUrl);
        politicalParties.push(party);
    }

    function vote(uint256 _partyId) external validPartyId(_partyId) whileVoting onlyOnce {
        partyVoteCount[_partyId]++;
        citizenVotedParty[msg.sender] = _partyId;
        citizenVoted[msg.sender] = true;
    }
}