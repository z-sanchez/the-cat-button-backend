import express from "express";
// import { connectToMongo } from "./connectors/db.js";

const app = express();

app.get("/api/cats", (req, res) => {
  res.send("New Successful Response");
});

// app.get("/cats", async (req, res) => {
//   const db = await connectToMongo();
//   const cats = await db.collection("cats").find({}).toArray();
//   res.json(cats);
// });

app.get("/", (req, res) => {
  res.send("You have reached the cat button server");
});

app.listen(3000, () => console.log("Example app is listening on port 3000"));
