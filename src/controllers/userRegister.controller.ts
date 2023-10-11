import { Request, Response } from "express";
import { User } from "../models";
import { sign } from "jsonwebtoken"

export const userRegister = async (req: Request, res: Response) => {

  const user: User = req.body;

  const userExists = await User.findOne({ email: user.email });

  if (userExists)
    return res.json({
      success: false,
      message: `User with given email id - ${user.email} already exists`,
    });

  const createdUser = await User.create({ ...req.body })

  const payload = { userId: createdUser.id }

  const authToken = sign(payload, process.env.JWT_SECRET_KEY as string)
  
  res.json({ sucess: true, authToken });

};
