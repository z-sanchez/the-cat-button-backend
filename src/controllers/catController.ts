import { Request, Response, NextFunction } from "express";
import { Cat } from "../models/Cats.js";
import { MOCKED_CATS } from "../mock/exportCats.js";
import { GENERATE_NEW_CAT_CHANCE } from "../utils/constants.js";
import { buildNewCat } from "../utils/buildNewCat.js";

// GET /api/cats - fetch random cat or previously stored one

export const getCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const shouldBeNewCat = Math.random() < GENERATE_NEW_CAT_CHANCE;

    if (shouldBeNewCat) {
      const result = await buildNewCat();
      res.status(200).json(result);
    }

    const cats = await Cat.find();
    const result = cats[Math.floor(Math.random() * cats.length)];

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getMockedCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = MOCKED_CATS.cats[0];
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
