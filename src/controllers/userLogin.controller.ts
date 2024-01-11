import { compare } from "bcrypt";
import { Request, Response } from "express";
import { Log, User } from "../models";
import { sign } from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  const event = "USER_LOGIN";

  const userCredentials: UserCredentials = req.body;

  const { email, password } = userCredentials;

  const user = await User.findOne({ email });

  if (!user) {
    await Log.create({
      event,
      message: `Login failed with ${JSON.stringify(userCredentials)}`,
      timestamp: new Date().toLocaleString(),
    });

    return res.json({
      status: false,
      message: `invalid credentials`,
    });
  }

  const isPasswordMatched = await compare(password.trim(), user.password);

  if (!isPasswordMatched)
    return res.json({ success: false, message: "invalid credentials" });

  const payload = { userId: user._id };

  const authToken = sign(payload, process.env.JWT_SECRET_KEY as string);

  await Log.create({
    event,
    message: `Login successful for ${JSON.stringify(user._id)}`,
    timestamp: new Date().toLocaleString(),
  });

  res.json({ status: true, authToken });
};
