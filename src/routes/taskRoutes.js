import bodyParser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import TasksModel from "../models/Tasks.js";

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
taskRoutes.get("/tasks", (req, res) => {
  TasksModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
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
taskRoutes.get("/tasks/:id", (req, res) => {
  TasksModel.findById(req.params.id)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
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
taskRoutes.post("/tasks", jsonParser, (req, res) => {
  let newId = uuidv4();
  const Task = new TasksModel({
    _id: newId,
    title: req.body.title,
    completed: req.body.completed,
  });
  Task.save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
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
taskRoutes.patch("/tasks/:id", jsonParser, (req, res) => {
  TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
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
taskRoutes.delete("/tasks/:id", (req, res) => {
  TasksModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

export default taskRoutes;
