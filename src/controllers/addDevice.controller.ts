import { Request, Response } from "express";
import { Device, Log } from "../models";

export const addDevice = (req: Request, res: Response) => {
  const event = "ADD_DEVICE";

  const device: Device = req.body;

  Device.create({
    ...device,
    addedOn: new Date().toLocaleString(),
  })
    .then((addedDevice) => {
      (async () => {
        await Log.create({
          event,
          message: `${device.addedBy} added a new device`,
          timestamp: new Date().toLocaleString(),
        });
      })();

      res.json({ status: true, addedDevice });
    })
    .catch((err) => {
      (async () => {
        await Log.create({
          event,
          message: err,
          timestamp: new Date().toLocaleString(),
        });
      })();

      res.json({ status: false, message: err });
    });
};
