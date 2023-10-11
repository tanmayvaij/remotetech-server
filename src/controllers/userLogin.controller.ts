import { compare } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models";
import { sign } from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  const userCredentials: UserCredentials = req.body;

  const { email, password } = userCredentials;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: `invalid credentials`,
    });

  const isPasswordMatched = await compare(password.trim(), user.password);

  if (!isPasswordMatched)
    return res.json({ success: false, message: "invalid credentials" });

  const payload = { userId: user._id };

  const authToken = sign(payload, process.env.JWT_SECRET_KEY as string);

  res.json({ success: true, authToken });
};
