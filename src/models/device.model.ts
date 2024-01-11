import { Schema, model, Document } from "mongoose";

interface Device {
  deviceName: string;
  roomNumber: string;
  ipAddress: string;
  addedOn: string;
  addedBy: string;
  deviceType: string;
  socketNumber: string
}

interface DeviceDocument extends Device, Document {}

export const Device = model<DeviceDocument>(
  "device",
  new Schema({
    deviceName: {
      type: String,
      required: true,
    },
    roomNumber: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    addedOn: {
      type: String,
      required: true,
    },
    addedBy: {
      type: String,
      required: true,
    },
    deviceType: {
      type: String,
      required: true,
      enum: ["appliance", "machine", "camera"],
    },
    socketNumber: {
      type: String,
      required: true
    }
  })
);
