const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');

const { vote, getTotalVoteCount } = require('./interact.js');

// create express server
const port = 3000;
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// setting up 'public' directory for using static files like css
app.use(express.static("public"));
// to handle data from POST reqs
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render('pages/index');
});

app.get("/castvote", function (req, res) {
  res.render('pages/castvote');
});

app.post("/castvote", async function (req, res) {
  const address = req.body.address;
  const candidate = req.body.candidate;
  const polingUnit = req.body.polingunit;
  const timeOfVote = (Date.now()).toString();

  const response = await vote(candidate, polingUnit, timeOfVote, address);

  res.render('pages/index', {response: response});
});

// listen for requests on PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
