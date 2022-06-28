// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct PoliticalParty {
        string name;
        string symbol;
    }

    PoliticalParty[] politicalParties;
    uint32 public startTime;
    uint32 public endTime;
    mapping(uint8 => uint256) partyVoteCount;
    mapping(address => uint8) citizenVotedParty;

    constructor(uint32 _startTime, uint32 _endTime) {
        startTime = _startTime;
        endTime = _endTime;
    }

    modifier onlyOnce {
        require(getCitizenVote() == 0, "Can vote only once!");
        _;
    }

    modifier whileVoting {
        require(block.timestamp >= startTime, "Voting has not started!");
        require(block.timestamp < endTime, "Voting time is over!");
        _;
    }

    modifier validPartyId(uint8 _partyId) {
        require(_partyId > 0 && _partyId <= politicalParties.length, "Party ID is invalid!");
        _;
    }

    modifier votingComplete {
        require(block.timestamp >= startTime, "Voting has not started!");
        require(block.timestamp >= endTime, "Voting time is not over!");
        _;
    }

    function getCitizenVote() public view returns (uint8) {
        return citizenVotedParty[msg.sender];
    }

    function getResults() external view votingComplete returns (uint256[] memory) {
        uint256[] memory results = new uint256[](politicalParties.length);

        for (uint8 i = 1; i <= politicalParties.length; i++)
            results[i-1] = partyVoteCount[i];

        return results;
    }

    function getPoliticalParties() external view returns (PoliticalParty[] memory) {
        PoliticalParty[] memory parties = new PoliticalParty[](politicalParties.length);

        for (uint8 i = 0; i < politicalParties.length; i++)
            parties[i] = politicalParties[i];

        return parties;
    }

    function addParty(
        string memory _name,
        string memory _symbol
    )
        external
        onlyOwner
    {
        PoliticalParty memory party = PoliticalParty(_name, _symbol);
        politicalParties.push(party);
    }

    function vote(uint8 _partyId) external validPartyId(_partyId) whileVoting onlyOnce {
        partyVoteCount[_partyId]++;
        citizenVotedParty[msg.sender] = _partyId;
    }
}