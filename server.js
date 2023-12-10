const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const {
  vote,
  getTotalVoteCount,
  getVoteCountOfCandidate,
  getAllVotersAddress,
  getAllVotersCandidate,
  getAllVotersPolingUnit,
  getAllVotersTimeOfVote,
} = require("./interact.js");

// create express server
const port = 3000;
const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");

// setting up 'public' directory for using static files like css
app.use(express.static("public"));
// to handle data from POST reqs
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async function (req, res) {
  SendDashboard(req, res);
});

app.get("/castvote", function (req, res) {
  res.render("pages/castvote");
});

app.post("/castvote", async function (req, res) {
  const address = req.body.address;
  const candidate = req.body.candidate;
  const polingUnit = req.body.polingunit;
  const timeOfVote = Date.now().toString();

  const response = await vote(candidate, polingUnit, timeOfVote, address);
  SendDashboard(req, res, response);
});

async function SendDashboard(req, res, status) {
  // get votes
  let totalVoteCount = parseFloat(await getTotalVoteCount());
  let candidate1VoteCount = parseFloat(await getVoteCountOfCandidate("Sir Alex Ferguson"));
  let candidate2VoteCount = parseFloat(await getVoteCountOfCandidate("Pep Guardiola"));

  // number of percentage bars to displayed under each candidate
  let percentage1 = candidate1VoteCount / totalVoteCount;
  let percentage2 = candidate2VoteCount / totalVoteCount;
  let percentsBar1 = percentage1 > percentage2 ? Math.ceil(percentage1 * 10) : Math.floor(percentage1 * 10);
  let percentsBar2 = percentage2 > percentage1 ? Math.ceil(percentage2 * 10) : Math.floor(percentage2 * 10);

  // get votersData
  let votersAddress = await getAllVotersAddress();
  let votersCandidate = await getAllVotersCandidate();
  let votersPolingUnit = await getAllVotersPolingUnit();
  let votersTimeOfVote = await getAllVotersTimeOfVote();

  let data = {
    voteCount: totalVoteCount,
    voteCount1: candidate1VoteCount,
    voteCount2: candidate2VoteCount,
    bars1: percentsBar1,
    bars2: percentsBar2,
    votersAddress: votersAddress,
    votersCandidate: votersCandidate,
    votersPolingUnit: votersPolingUnit,
    votersTimeOfVote: votersTimeOfVote,
  };

  // if status was sent, add it into the data to be sent 
  if (typeof status != "undefined") {
    data['response'] = status;
  } 

  res.render("pages/index", data);
}

// listen for requests on PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
