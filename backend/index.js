import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import swaggerUI from "swagger-ui-express";
import connectMongo from "./src/config/mongoConnect.js";
import swaggerSpec from "./src/config/swagger.js";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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

/**
 * @swagger
 * tags:
 *   - name: global
 *     description: Global requests
 */

/**
 * @swagger
 * /api/v1:
 *   get:
 *     tags:
 *       - global
 *     summary: Get welcome message
 *     description: Returns a welcome message for the API to test if we are correctly connected to the api
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Welcome to the todo list"
 */
apiRouter.get("/", (req, res) => {
  res.send("Welcome to the todo list");
});

app.use("/api/v1", router);

app.use("*", (_req, res) => res.status(404).send("NO_RESOURCE_AVAILABLE"));
