import { ethers } from "hardhat";

const main = async () => {
  const votingPoll = "0x7ab9D95593a9b09Eb0150F0e62aae3758896AC5d";
  const VOTINGPOLL = await ethers.getContractAt("VotingPoll", votingPoll);

  const votingTx = await VOTINGPOLL.vote(3);
  await votingTx.wait();

  const getVotes = await VOTINGPOLL.getVotes(3);
  console.log(getVotes);
};
main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
