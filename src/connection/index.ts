import { connect } from "mongoose";

export const databaseConnection = () => {
  connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("Connected to database successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
