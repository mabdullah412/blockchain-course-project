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

// candidates
const CANDIDATE1 = "Batman";
const CANDIDATE2 = "Superman";
const CANDIDATE1_WEB = "https://en.wikipedia.org/wiki/Batman";
const CANDIDATE2_WEB = "https://en.wikipedia.org/wiki/Superman";

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
  res.render("pages/castvote", {
    candidate1: CANDIDATE1,
    candidate2: CANDIDATE2,
  });
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
  let candidate1VoteCount = parseFloat(
    await getVoteCountOfCandidate(CANDIDATE1)
  );
  let candidate2VoteCount = parseFloat(
    await getVoteCountOfCandidate(CANDIDATE2)
  );

  // number of percentage bars to displayed under each candidate
  let percentage1 = candidate1VoteCount / totalVoteCount;
  let percentage2 = candidate2VoteCount / totalVoteCount;
  let percentsBar1 =
    percentage1 > percentage2
      ? Math.ceil(percentage1 * 10)
      : Math.floor(percentage1 * 10);
  let percentsBar2 =
    percentage2 > percentage1
      ? Math.ceil(percentage2 * 10)
      : Math.floor(percentage2 * 10);

  // get votersData
  let votersAddress = await getAllVotersAddress();
  let votersCandidate = await getAllVotersCandidate();
  let votersPolingUnit = await getAllVotersPolingUnit();
  let votersTimeOfVote = await getAllVotersTimeOfVote();

  // calculate graph items heights, largest-graph-item = 10rem
  let graphItems = [0, 0, 0, 0]; // PU, SI, BA, PE

  votersPolingUnit.forEach((element) => {
    switch (element) {
      case "Punjab":
        graphItems[0]++;
        break;
      case "Sindh":
        graphItems[1]++;
        break;
      case "Balochistan":
        graphItems[2]++;
        break;
      case "Peshawer":
        graphItems[3]++;
        break;
    }
  });

  let largestElement = Math.max(...graphItems);

  for (let i = 0; i < graphItems.length; i++) {
    if (graphItems[i] == largestElement) {
      graphItems[i] = 10;
      continue;
    }

    graphItems[i] = Math.ceil((graphItems[i] / largestElement) * 10);
  }

  // ejs data
  let data = {
    candidate1: CANDIDATE1,
    candidate2: CANDIDATE2,
    candidate1href: CANDIDATE1_WEB,
    candidate2href: CANDIDATE2_WEB,
    voteCount: totalVoteCount,
    voteCount1: candidate1VoteCount,
    voteCount2: candidate2VoteCount,
    bars1: percentsBar1,
    bars2: percentsBar2,
    votersAddress: votersAddress,
    votersCandidate: votersCandidate,
    votersPolingUnit: votersPolingUnit,
    votersTimeOfVote: votersTimeOfVote,
    graphItems: graphItems,
  };

  // if status was sent, add it into the data to be sent
  if (typeof status != "undefined") {
    data["response"] = status;
  }

  res.render("pages/index", data);
}

// listen for requests on PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
