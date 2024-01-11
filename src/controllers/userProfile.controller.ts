import { Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { Log, User } from "../models";

interface ExtendedJwtPayload extends JwtPayload {
  userId: string;
}

export const userProfile = async (req: Request, res: Response) => {
  const event = "GET_USER_PROFILE";
  const authToken = req.header("authToken");

  if (!authToken) {
    await Log.create({
      event,
      message: `Request came without a valid auth-token`,
      timestamp: new Date().toLocaleString(),
    });

    return res.json({ status: false, message: "Verify using a valid token" });
  }

  try {
    const { userId } = verify(
      authToken,
      process.env.JWT_SECRET_KEY as string
    ) as ExtendedJwtPayload;

    const userProfile = await User.findById(userId, { password: 0, __v: 0 });

    await Log.create({
      event,
      message: `Sending user profile:- ${JSON.stringify(userProfile)}`,
      timestamp: new Date().toLocaleString(),
    });

    res.json(userProfile);
  } catch {
    await Log.create({
      event,
      message: `Request came with an invalid auth-token ${authToken}`,
      timestamp: new Date().toLocaleString(),
    });
  }
};
