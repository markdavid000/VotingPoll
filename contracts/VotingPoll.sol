// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

error INVALID_OPTION();
error ADDRESS_ZERO_DETECTED();

contract VotingPoll is Ownable {
    string public question;
    string[] public options;
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;

    event Voted(address indexed voter, uint256 indexed option);

    constructor(string memory _question, string[] memory _options) Ownable(msg.sender) {
        question = _question;
        options = _options;
    }

    modifier voteOnce() {
        require(!hasVoted[msg.sender], "You have already voted.");
        _;
    }

    function vote(uint256 _optionIndex) external voteOnce {
        if(msg.sender == address(0)) {
            revert ADDRESS_ZERO_DETECTED();
        }

        if(_optionIndex > options.length) {
            revert INVALID_OPTION();
        }

        votes[_optionIndex]++;

        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _optionIndex);
    }

    function getVotes(uint _optionIndex) external view returns (uint256) {
        if(_optionIndex > options.length) {
            revert INVALID_OPTION();
        }

        return votes[_optionIndex];
    }
}
