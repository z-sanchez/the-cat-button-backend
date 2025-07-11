import express from "express";
import {
  getCat,
  getMockedCat,
  getNewCat,
} from "../controllers/catController.js";

const catRouter = express.Router();

catRouter.get("/", getCat);
catRouter.get("/mocked", getMockedCat);
catRouter.get("/new", getNewCat);

export { catRouter };
