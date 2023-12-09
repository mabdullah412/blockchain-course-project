const blockBallot = artifacts.require("BlockBallot");

module.exports = function(deployer) {
    deployer.deploy(blockBallot);
};