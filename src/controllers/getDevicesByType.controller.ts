import { Request, Response } from "express";
import { Device } from "../models";

export const getDevicesByType = async (req: Request, res: Response) => {
  const { deviceType } = req.query;

  const devices = await Device.find({ deviceType }, { __v: 0 });

  res.json(devices);
};
