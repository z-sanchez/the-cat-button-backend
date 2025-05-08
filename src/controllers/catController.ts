import { Request, Response, NextFunction } from "express";
import { Cat } from "../models/Cats.js";

// GET /api/cats - fetch random cat

export const getCat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cats = await Cat.find();
    const randomCat = cats[Math.floor(Math.random() * cats.length)];

    res.status(200).json(randomCat);
  } catch (err) {
    next(err);
  }
};
