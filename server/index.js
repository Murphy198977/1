// an expressjs server which allows a string to be tagged as "actionable", "justified", "specific"

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get("/api/feedback", (req, res) => {
  feedback = db.getRandomFeedbackForTagging();
  feedback.then((feedback) => {
    res.type("json");
    res.status(200).send(feedback);
  });
});

app.post("/api/tag", (req, res) => {
  db.updateFeedbackWithTags(req.body._id, req.body.tags);
  res.status(200).send("success");
});

app.listen(port, () => {
  console.log(`Feedback Tagger listening on port ${port}`);
});
