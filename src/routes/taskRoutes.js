import bodyParser from "body-parser";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import TasksModel from "../models/Tasks.js";

const taskRoutes = express.Router();

var jsonParser = bodyParser.json();

// get all tasks
taskRoutes.get("/tasks", (req, res) => {
  TasksModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// add new task
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

// update a task
taskRoutes.patch("/tasks/:id", jsonParser, (req, res) => {
  TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// delete a task
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
