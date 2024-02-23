import { ethers } from "hardhat";

async function main() {
  const VotingPollFactory = await ethers.deployContract("VotingPollFactory");

  await VotingPollFactory.waitForDeployment();

  console.log(
    `VotingPollFactory has been deployed to ${VotingPollFactory.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
