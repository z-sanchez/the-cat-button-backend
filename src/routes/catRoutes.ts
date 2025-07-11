import express from "express";
import { getCat, getMockedCat } from "../controllers/catController.js";

const catRouter = express.Router();

catRouter.get("/", getCat);
catRouter.get("/mocked", getMockedCat);

export { catRouter };
