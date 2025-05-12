import { Request, Response, NextFunction } from "express";
import { Cat } from "../models/Cats.js";
import { MOCKED_CATS } from "../mock/exportCats.js";
import { GENERATE_NEW_CAT_CHANCE } from "../utils/constants.js";
import { buildNewCat } from "../utils/buildNewCat.js";

// GET /api/cats - fetch random cat

export const getCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let result = MOCKED_CATS.cats[0];

    // const shouldBeNewCat = Math.random() < GENERATE_NEW_CAT_CHANCE;

    // if (shouldBeNewCat) {

    // result = await buildNewCat();
    // }

    //  else {
    //   const cats = await Cat.find();

    //   result = cats[Math.floor(Math.random() * cats.length)];
    // }

    console.log("SERVER HIT");

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
