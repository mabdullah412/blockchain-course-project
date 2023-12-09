const { Web3 } = require("web3");

// connect to ganache rpc server
const web3 = new Web3("http://127.0.0.1:7545");

const COMPILED_CONTRACT = require("./build/contracts/BlockBallot.json");
const CONTRACT_ADDRESS = "0xe3dFB6B793b12aDA0fA7af318D43675BC6c9A483";

let instance = new web3.eth.Contract(COMPILED_CONTRACT.abi, CONTRACT_ADDRESS);

async function vote(candidate, polingUnit, timeOfVote, account) {
  try {
    await instance.methods.vote(candidate, polingUnit, timeOfVote).send({
      from: account,
      gasLimit: "6721975",
    });

    return "success";
  } catch (error) {
    if (error.message == "Error happened while trying to execute a function inside a smart contract") {
      console.log("User with this address has already voted.");
      return "duplicate";
    }
    console.log(error.message);
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
  'vote': vote,
  'getVoteCountOfCandidate': getVoteCountOfCandidate,
  'getTotalVoteCount': getTotalVoteCount,
  'getAllVotersAddress': getAllVotersAddress,
  'getAllVotersCandidate': getAllVotersCandidate,
  'getAllVotersPolingUnit': getAllVotersPolingUnit,
  'getAllVotersTimeOfVote': getAllVotersTimeOfVote,
};

// async function functionTesting() {
//   console.log(`Total vote count: ${await getTotalVoteCount()}`);
//   console.log(
//     `Vote count of Abdullah: ${await getVoteCountOfCanditate("Abdullah")}`
//   );
//   console.log(
//     `Vote count of Mohsin: ${await getVoteCountOfCanditate("Mohsin")}`
//   );
//   console.log("--------------------------------------------");
//   console.log(`getAllVotersAddress:\n${await getAllVotersAddress()}`);
//   console.log(`getAllVotersCandidate:\n${await getAllVotersCandidate()}`);
//   console.log(`getAllVotersPolingUnit:\n${await getAllVotersPolingUnit()}`);
//   console.log(`getAllVotersTimeOfVote:\n${await getAllVotersTimeOfVote()}`);
// }

// vote("Abdullah", "Punjab", "");
// vote("Mohsin", "Sindh", "");
// functionTesting();
