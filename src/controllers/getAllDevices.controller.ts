import { Request, Response } from "express";
import { Device } from "../models";

export const getAllDevices = async (req: Request, res: Response) => {

    const allDevices = await Device.find({}, { __v: 0 })

    res.json(allDevices)
    
}