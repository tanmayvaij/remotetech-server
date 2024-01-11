import { Request, Response } from "express";
import { Device } from "../models";

interface Device {
  roomNumber: string;
  deviceName: string;
  ipAddress: string;
  _id: string;
}

export const editDevice = (req: Request, res: Response) => {
  const { _id, deviceName, ipAddress, roomNumber }: Device = req.body;

  Device.findOneAndUpdate(
    { _id },
    {
      $set: {
        deviceName,
        ipAddress,
        roomNumber,
        addedOn: new Date().toLocaleString(),
      },
    },
    { returnOriginal: false }
  )
    .then((updatedDevice) => {
      res.json({ status: true, updatedDevice });
    })
    .catch((err) => {
      res.json({ status: false, message: err });
    });
};
