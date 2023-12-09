const express = require("express");

const port = 3000;
const app = express();

// setting up 'public' directory for using static files like css
app.use(express.static("public"));

// handle get requests
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/castvote.html", function (req, res) {
  res.sendFile(__dirname + "/castvote.html");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
