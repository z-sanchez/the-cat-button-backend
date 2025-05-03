import express from "express";

const app = express();

app.get("/api/cats", (req, res) => {
  res.send("New Successful Response");
});

app.get("/cats", (req, res) => {
  res.send("Cats Response Path");
});

app.get("/", (req, res) => {
  res.send("You have reached the cat button server");
});

app.listen(3000, () => console.log("Example app is listening on port 3000"));
