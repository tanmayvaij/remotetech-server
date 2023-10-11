import { Schema, model, Document } from "mongoose";

interface UserDocument extends User, Document {}

export const User = model<UserDocument>(
  "user",
  new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
  })
);
