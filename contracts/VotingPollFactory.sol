// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "./VotingPoll.sol";
contract VotingPollFactory {
    VotingPoll[] votingPollClones;

    function createVotingPollInstance(string memory _question, string[] memory _options) external returns(VotingPoll votingPoll_) {
        votingPoll_ = new VotingPoll(_question, _options);

        votingPollClones.push(votingPoll_);
    }

    function getVotingPollInstance() external view returns (VotingPoll[] memory) {
        return votingPollClones;
    }
}