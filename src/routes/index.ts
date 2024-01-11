import { Router } from "express";

import { authRouter } from "./auth.route";
import { deviceRouter } from "./device.route";

export const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/device", deviceRouter);
