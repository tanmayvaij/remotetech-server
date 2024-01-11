import { Request, Response } from "express";
import { Log, User } from "../models";
import { sign } from "jsonwebtoken";

export const userRegister = async (req: Request, res: Response) => {
  const event = "USER_REGISTRATION";

  const user: User = req.body;

  const userExists = await User.findOne({ email: user.email });

  if (userExists) {
    const message = `User with given email id - ${user.email} already exists`;

    await Log.create({
      event,
      message,
      timestamp: new Date().toLocaleString(),
    });

    return res.json({
      status: false,
      message,
    });
  }

  const createdUser = await User.create({
    ...req.body,
    joinedOn: new Date().toLocaleString(),
    role: "admin",
  });

  const payload = { userId: createdUser.id };

  const authToken = sign(payload, process.env.JWT_SECRET_KEY as string);

  await Log.create({
    event,
    message: `User ${JSON.stringify(createdUser)} created successfully`,
    timestamp: new Date().toLocaleString(),
  });

  res.json({ status: true, authToken });
};
