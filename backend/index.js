import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import router from "./src/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const frontUrl = process.env.FRONTEND_URL || "http://localhost:3001";

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// connectMongo()
//   .then(() => {
//     mongoose.connect(process.env.MONGO_URL);
//   })
//   .then(() => {
//     console.log("Database connected");
//     const server = app.listen(process.env.PORT);
//     return server;
//   })
//   .then(() => {
//     console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
//   })
//   .catch((e) => {
//     console.error(`ERROR_STARTING_APP_${e.message}`);
//   });
app.listen(process.env.PORT);

const apiRouter = express.Router();

app.use(
  cors({
    origin: frontUrl,
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", frontUrl),
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     ),
//     next();
// });

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

export default app;
