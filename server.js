import express from "express";

const app = express();

app.get("/api/cats", (req, res) => {
  res.send("Successful Response");
});

app.listen(3000, () => console.log("Example app is listening on port 3000"));
