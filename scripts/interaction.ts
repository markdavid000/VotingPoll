import { ethers } from "hardhat";

const main = async () => {
  const question = "Which is the fastest car in the world";
  const options = ["Bugatti", "Dodge Challenger", "Ferrari", "Lamborghini"];

  const votingPollFactory = "0xdDF339C4c73A975bC6287892E8639eF687283d62";
  const VOTINGPOLLFACTORY = await ethers.getContractAt(
    "IVotingPollFactory",
    votingPollFactory
  );

  const createPollTx = await VOTINGPOLLFACTORY.createVotingPollInstance(
    question,
    options
  );
  await createPollTx.wait();

  const getClones = await VOTINGPOLLFACTORY.getVotingPollInstance();
  console.log(getClones);
};

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
