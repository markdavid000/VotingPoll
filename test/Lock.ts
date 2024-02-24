import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VotingPollFactory", () => {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  const deployFactoryVotingPollAndVotingPollFixture = async () => {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const VotingPollFactory = await ethers.getContractFactory(
      "VotingPollFactory"
    );
    const votingPollFactory = await VotingPollFactory.deploy();

    const VotingPoll = await ethers.getContractFactory("VotingPoll");
    const votingPoll = await VotingPoll.deploy(
      "Which is the fastest car in the world",
      ["Bugatti", "Dodge Challenger", "Ferrari", "Lamborghini"]
    );

    return { votingPollFactory, votingPoll, owner, otherAccount };
  };

  describe("Deployment", () => {
    it("Should check if votingPollFactory address is address(0)", async () => {
      const { votingPollFactory } = await loadFixture(
        deployFactoryVotingPollAndVotingPollFixture
      );

      expect(votingPollFactory.target).is.not.equal(0);
    });

    it("Should check if votingPoll address is address(0)", async () => {
      const { votingPoll } = await loadFixture(
        deployFactoryVotingPollAndVotingPollFixture
      );

      expect(votingPoll.target).is.not.equal(0);
    });
  });

  describe("Instance Creation", () => {
    it("Should be able to create voting poll instance", async () => {
      const { votingPollFactory } = await loadFixture(
        deployFactoryVotingPollAndVotingPollFixture
      );

      const question = "Which is the fastest car in the world";
      const options = ["Bugatti", "Dodge Challenger", "Ferrari", "Lamborghini"];

      const votingFactoryTx = await votingPollFactory.createVotingPollInstance(
        question,
        options
      );
      await votingFactoryTx.wait();

      const pollInstance = await votingPollFactory.getVotingPollInstance();

      expect(pollInstance[0]).to.equal(
        "0xa16E02E87b7454126E5E10d957A927A7F5B5d2be"
      );
    });
  });

  describe("Voting", () => {
    describe("Validation", () => {
      it("Should revert if option does not exist", async () => {
        const { votingPoll } = await loadFixture(
          deployFactoryVotingPollAndVotingPollFixture
        );

        await expect(votingPoll.vote(5)).to.be.revertedWithCustomError(
          votingPoll,
          "INVALID_OPTION"
        );

        await expect(votingPoll.getVotes(5)).to.be.revertedWithCustomError(
          votingPoll,
          "INVALID_OPTION"
        );
      });

      it("Should check if owner address is address(0)", async () => {
        const { owner } = await loadFixture(
          deployFactoryVotingPollAndVotingPollFixture
        );

        expect(owner.address).not.to.equal(0);
      });
    });
    describe("Event", () => [
      it("Should emit an event on successful vote", async () => {
        const { votingPoll, owner } = await loadFixture(
          deployFactoryVotingPollAndVotingPollFixture
        );

        const votingTx = await votingPoll.vote(3);
        await votingTx.wait();

        expect(votingTx)
          .to.emit(votingPoll, "Voted")
          .withArgs(owner.address, 3);
      }),
    ]);
    it("Should Vote successfully", async () => {
      const { votingPoll } = await loadFixture(
        deployFactoryVotingPollAndVotingPollFixture
      );

      const votingTx = await votingPoll.vote(3);
      await votingTx.wait();

      const voteCount = await votingPoll.getVotes(3)
      expect(voteCount).to.equal(1);
    });
  });
});
