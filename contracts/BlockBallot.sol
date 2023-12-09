// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BlockBallot {
    // stores address of the user who has voted
    mapping (address => bool) public hasVoted;

    // for storing voters data for frontend use
    address[] public votersAddress;
    string[] public votersCandidate;
    string[] public votersPolingUnit;
    uint[] public votersTimeOfVote; 

    // stores the number of votes of each candidate
    mapping (string => uint256) public votes;
    // stores the total number of votes
    uint256 public voteCount = 0;

    // event dispatched on successful vote
    event Voted(address indexed voter, string candidate);

    // the main vote function
    function vote(string memory candidate, string memory polingUnit) external {
        require(!hasVoted[msg.sender], "User with this address has already voted.");

        // increment candidates no. of votes
        votes[candidate]++;
        hasVoted[msg.sender] = true;

        // store voters data
        votersAddress.push(msg.sender);
        votersCandidate.push(candidate);
        votersPolingUnit.push(polingUnit);
        votersTimeOfVote.push(block.timestamp);

        // increment total no. of votes
        voteCount++;

        emit Voted(msg.sender, candidate);
    }

    // returns the vote count of a candidate
    function getVotesOfCanditate(string memory candidate) public view returns (uint256 data) {
        return votes[candidate];
    }

    // returns the total vote count
    function getVoteCount() public view returns (uint256 data) {
        return voteCount;
    }

    // user data functions
    function getAllVotersAddress() public view returns (address[] memory) {
        return votersAddress;
    }
    function getAllVotersCandidate() public view returns (string[] memory) {
        return votersCandidate;
    }
    function getAllVotersPolingUnit() public view returns (string[] memory) {
        return votersPolingUnit;
    }
    function getAllVotersTimeOfVote() public view returns (uint[] memory) {
        return votersTimeOfVote;
    }
}