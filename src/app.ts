import express from "express";
import cors from "cors";
import { catRouter } from "./routes/catRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("You have reached the cat button server");
});

app.use("/api/cats", catRouter);

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.stack(500).json({ error: "Something went wrong" });
});

export default app;
