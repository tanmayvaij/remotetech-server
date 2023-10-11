import express from "express";
import { rootRouter } from "./routes";
import { databaseConnection } from "./connection";
import { config } from "dotenv";

const PORT = 5000;

config();

const app = express();

app.use(express.json());

app.use("/", rootRouter);

databaseConnection();

app.listen(PORT, () => {
  console.log(`RemoteTech Server started on port ${PORT} successfully`);
});
