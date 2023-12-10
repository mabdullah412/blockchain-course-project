const blockBallot = artifacts.require("BlockBallot");
const fs = require("fs");

module.exports = function (deployer) {
  deployer
    .deploy(blockBallot)

    // save the contract address to file:
    .then(() => {
      let address = blockBallot.address;
      fs.writeFileSync("contract_address.txt", address, (err) => {});
    });
};
