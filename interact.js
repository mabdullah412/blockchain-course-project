const { Web3 } = require("web3");
const fs = require("fs");

// connect to ganache rpc server
const web3 = new Web3("http://127.0.0.1:7545");

const COMPILED_CONTRACT = require("./build/contracts/BlockBallot.json");
const CONTRACT_ADDRESS = fs.readFileSync("contract_address.txt").toString();

let instance = new web3.eth.Contract(COMPILED_CONTRACT.abi, CONTRACT_ADDRESS);

async function vote(candidate, polingUnit, timeOfVote, account) {
  try {
    if (!(await isAddressValid(account))) {
      return "invalid";
    }

    await instance.methods.vote(candidate, polingUnit, timeOfVote).send({
      from: account,
      gasLimit: "6721975",
    });

    return "success";
  } catch (error) {
    if (
      error.message ==
      "Error happened while trying to execute a function inside a smart contract"
    ) {
      return "duplicate";
    }
    console.log(error.message);
  }
}

async function isAddressValid(account) {
  let accounts = await web3.eth.getAccounts();

  if (accounts.includes(account)) {
    return true;
  } else {
    return false;
  }
}

async function getVoteCountOfCandidate(candidate) {
  try {
    let data = await instance.methods.getVoteCountOfCandidate(candidate).call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getTotalVoteCount() {
  try {
    let data = await instance.methods.getTotalVoteCount().call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllVotersAddress() {
  try {
    let data = await instance.methods.getAllVotersAddress().call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllVotersCandidate() {
  try {
    let data = await instance.methods.getAllVotersCandidate().call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllVotersPolingUnit() {
  try {
    let data = await instance.methods.getAllVotersPolingUnit().call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllVotersTimeOfVote() {
  try {
    let data = await instance.methods.getAllVotersTimeOfVote().call();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  vote: vote,
  getVoteCountOfCandidate: getVoteCountOfCandidate,
  getTotalVoteCount: getTotalVoteCount,
  getAllVotersAddress: getAllVotersAddress,
  getAllVotersCandidate: getAllVotersCandidate,
  getAllVotersPolingUnit: getAllVotersPolingUnit,
  getAllVotersTimeOfVote: getAllVotersTimeOfVote,
};
