import express from "express";
import { connectToMongo } from "./connectors/db.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/api/cats", (req, res) => {
  res.send("New Successful Response");
});

app.get("/cats", async (req, res) => {
  const db = await connectToMongo();
  const cats = await db.collection("cats").find({}).toArray();
  res.json(cats);
});

app.get("/", (req, res) => {
  res.send("You have reached the cat button server");
});

app.listen(3000, () => console.log("Example app is listening on port 3000"));
