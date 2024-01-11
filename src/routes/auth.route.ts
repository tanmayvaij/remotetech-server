import { Router } from "express";
import { userLogin, userRegister, userProfile } from "../controllers";
import { passwordHasher } from "../middlewares";

export const authRouter = Router();

authRouter.route("/user-register").post(passwordHasher, userRegister);

authRouter.route("/user-login").post(userLogin);

authRouter.route("/user-profile").get(userProfile);
