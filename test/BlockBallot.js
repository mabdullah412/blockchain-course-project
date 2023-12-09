const BlockBallot = artifacts.require("BlockBallot.sol");

contract("BlockBallot", () => {
    it('Should update the total vote count', async () => {
        const ballot = await BlockBallot.new();
        await ballot.vote("Abdullah", "Punjab");
        const voteCount = await ballot.getVoteCount();
        assert(voteCount.toString() === '1');
    });

    it('Should update the vote count of the candidate', async () => {
        const ballot = await BlockBallot.new();
        await ballot.vote("Abdullah", "Punjab");
        const voteCount = await ballot.getVotesOfCanditate("Abdullah");
        assert(voteCount.toString() === '1');
    });
});