import mongoose, { Schema, Document } from "mongoose";

interface ICat extends Document {
  id: number;
  imageSource: string;
  name: string;
  age: number;
  occupation: string;
  hobby: string;
  origin: string;
  backstory: string;
}

const CatSchema = new Schema<ICat>({
  id: { type: Number, required: false },
  imageSource: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
  hobby: { type: String, required: true },
  origin: { type: String, required: true },
  backstory: { type: String, required: true },
});

export const Cat = mongoose.model<ICat>("Cat", CatSchema);
