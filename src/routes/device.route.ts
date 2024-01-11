import { Router } from "express";
import {
  addDevice,
  editDevice,
  getAllDevices,
  getDevicesByType,
  removeDevice,
} from "../controllers";

export const deviceRouter = Router();

deviceRouter.route("/get-all-devices").get(getAllDevices);

deviceRouter.route("/get-devices-by-type").get(getDevicesByType);

deviceRouter.route("/add-device").post(addDevice);

deviceRouter.route("/edit-device").put(editDevice);

deviceRouter.route("/remove-device").delete(removeDevice);
