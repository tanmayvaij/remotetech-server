import { Request, Response, NextFunction } from "express";
import { genSalt, hash } from "bcrypt";

export const passwordHasher = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const user: User = req.body;

  const salt = await genSalt(12);

  const hashedPassword = await hash(user.password, salt);

  user.password = hashedPassword;

  next();
};
