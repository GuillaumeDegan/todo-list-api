import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectMongo from "./src/config/mongoConnect.js";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectMongo()
  .then(() => {
    mongoose.connect(process.env.MONGO_URL);
  })
  .then(() => {
    console.log("Database connected");
    return app.listen(process.env.PORT);
  })
  .then(() => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  })
  .catch((e) => {
    console.error(`ERROR_STARTING_APP_${e.message}`);
  });

const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("Welcome to the todo list");
});

app.use("/api/v1", router);

app.use("*", (_req, res) => res.status(404).send("NO_RESOURCE_AVAILABLE"));
