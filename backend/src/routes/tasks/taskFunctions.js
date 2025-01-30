import { v4 as uuidv4 } from "uuid";
import TasksModel from "../../models/Tasks.js";

export const handleGetAllTasks = async (req, res) => {
  TasksModel.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

export const handleGetTaskById = async (req, res) => {
  const { id } = req.params;
  TasksModel.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
};

export const handleCreateTask = async (req, res) => {
  let newId = uuidv4();
  if (req.body._id) {
    newId = req.body._id;
  }
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
};

export const handleUpdateTask = async (req, res) => {
  TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};

export const handleDeleteTask = async (req, res) => {
  TasksModel.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
};
