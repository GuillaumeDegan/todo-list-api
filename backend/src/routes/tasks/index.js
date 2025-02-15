import bodyParser from "body-parser";
import express from "express";
import {
  handleCreateTask,
  handleDeleteTask,
  handleGetAllTasks,
  handleGetTaskById,
  handleUpdateTask,
} from "./taskFunctions.js";

const taskRoutes = express.Router();

var jsonParser = bodyParser.json();

/**
 * @swagger
 * tags:
 *   - name: tasks
 *     description: All the tasks routes
 */

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     tags:
 *       - tasks
 *     summary: Get all tasks
 *     description: Get all tasks in the database.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   title:
 *                     type: string
 *                     example: "Acheter du lait"
 *                   completed:
 *                     type: boolean
 *                     example: false
 */

/**
 * GET /tasks
 * @name get/tasks
 * @function
 * @inner
 * @param {Object} req - Request object
 * @param {Object} res - Response object.
 */
taskRoutes.get("/tasks", (req, res) => {
  handleGetAllTasks(req, res);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     tags:
 *       - tasks
 *     summary: Get a task by ID
 *     description: Retrieve a task from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Acheter du lait"
 *                 completed:
 *                   type: boolean
 *                   example: false
 */

/**
 *  GET /tasks/{id}
 * @name get/tasks/id
 * @function
 * @inner
 * @param {string} id.path.required - L'ID de la tâche
 * @param {Object} req - Request object
 * @param {Object} res - Response object.
 */
taskRoutes.get("/tasks/:id", (req, res) => {
  handleGetTaskById(req, res);
});

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     tags:
 *       - tasks
 *     summary: Create a new task
 *     description: Add a new task to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Acheter du lait"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Acheter du lait"
 *                 completed:
 *                   type: boolean
 *                   example: false
 */

/**
 *  POST /tasks
 * @name post/tasks
 * @function
 * @inner
 * @param {object} task.body.required - Détails de la tâche à créer
 * @param {string} task.title.body.required - Le titre de la tâche
 * @param {boolean} task.completed.body - Statut de la tâche
 * @param {Object} req - Request object
 * @param {Object} res - Response object.
 */
taskRoutes.post("/tasks", jsonParser, (req, res) => {
  handleCreateTask(req, res);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   patch:
 *     tags:
 *       - tasks
 *     summary: Update a task by ID
 *     description: Modify an existing task in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Acheter du lait"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Acheter du lait"
 *                 completed:
 *                   type: boolean
 *                   example: true
 */

/**
 *  PATCH /tasks/{id}
 * @name patch/tasks/id
 * @function
 * @inner
 * @param {string} id.path.required - L'ID de la tâche à mettre à jour
 * @param {object} task.body.required - Données à mettre à jour
 * @param {string} task.title.body - Nouveau titre de la tâche
 * @param {boolean} task.completed.body - Nouveau statut de la tâche
 * @param {Object} req - Request object
 * @param {Object} res - Response object.
 */
taskRoutes.patch("/tasks/:id", jsonParser, (req, res) => {
  handleUpdateTask(req, res);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     tags:
 *       - tasks
 *     summary: Delete a task by ID
 *     description: Remove a task from the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The task ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Acheter du lait"
 *                 completed:
 *                   type: boolean
 *                   example: false
 */

/**
 *  DELETE /tasks/{id}
 * @name delete/tasks/id
 * @function
 * @inner
 * @param {string} id.path.required - L'ID de la tâche à supprimer
 * @param {Object} req - Request object
 * @param {Object} res - Response object.
 */
taskRoutes.delete("/tasks/:id", (req, res) => {
  handleDeleteTask(req, res);
});

export default taskRoutes;
