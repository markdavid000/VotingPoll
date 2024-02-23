// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../VotingPoll.sol";
interface IVotingPollFactory {
    function createVotingPollInstance(string memory _question, string[] memory _options) external returns(VotingPoll votingPoll_);

    function getVotingPollInstance() external view returns (VotingPoll[] memory);
}