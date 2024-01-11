import { Request, Response } from "express";
import { Device } from "../models";

interface Device {
  _id: string;
}

export const removeDevice = (req: Request, res: Response) => {
  const { _id }: Device = req.body;

  Device.findOneAndDelete({ _id }, { returnOriginal: false })
    .then((removedDevice) => {
      res.json({ status: true, removedDevice });
    })
    .catch((err) => {
      res.json({ status: false, message: err });
    });
};
