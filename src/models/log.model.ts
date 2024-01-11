import { Schema, model, Document } from "mongoose";

type EventType =
  | "ADD_DEVICE"
  | "EDIT_DEVICE"
  | "GET_ALL_DEVICES"
  | "REMOVE_DEVICE"
  | "USER_REGISTRATION"
  | "USER_LOGIN"
  | "GET_USER_PROFILE";

export interface Log {
  event: EventType;
  message: string;
  timestamp: String;
}

interface LogDocument extends Log, Document {}

export const Log = model<LogDocument>(
  "log",
  new Schema({
    event: {
      type: String,
      required: true,
      enum: [
        "ADD_DEVICE",
        "EDIT_DEVICE",
        "GET_ALL_DEVICES",
        "REMOVE_DEVICE",
        "USER_REGISTRATION",
        "USER_LOGIN",
        "GET_USER_PROFILE",
      ],
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
  })
);
