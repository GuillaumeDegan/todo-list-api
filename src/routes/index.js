import express from "express";
import tasksRoutes from "./taskRoutes.js";

const router = express.Router();

router.use(tasksRoutes);

export default router;
