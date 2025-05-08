import express from "express";
import { getCat } from "../controllers/catController.js";

const catRouter = express.Router();

catRouter.get("/", getCat);

export { catRouter };
