const { Web3 } = require("web3");

// connect to ganache rpc server
const web3 = new Web3("http://127.0.0.1:7545");

const COMPILED_CONTRACT = require("./build/contracts/BlockBallot.json");
const CONTRACT_ADDRESS = "";

let instance;
let accounts;

async function vote(candidate, polingUnit, account) {
  try {
    instance = new web3.eth.Contract(COMPILED_CONTRACT.abi, CONTRACT_ADDRESS);
    accounts = await web3.eth.getAccounts();

    await instance.methods.vote(candidate, polingUnit).send({
      from: accounts[0],
      gasLimit: "6721975",
    });
  } catch (error) {
    console.log(error["innerError"].toString().split("revert ")[1]);
  }
}

vote("Abdullah", "Punjab");
