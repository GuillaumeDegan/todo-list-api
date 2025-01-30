import express from "express";
import tasksRoutes from "./tasks/index.js";

const router = express.Router();

router.use(tasksRoutes);

export default router;
