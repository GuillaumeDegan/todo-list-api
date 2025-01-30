import { v4 as uuidv4 } from "uuid";
import TasksModel from "../../models/Tasks.js";

let allTodos = [
  {
    _id: "1",
    title: "Acheter du lait",
    completed: false,
  },
  {
    _id: "2",
    title: "Acheter du pain",
    completed: false,
  },
  {
    _id: "3",
    title: "Acheter du beurre",
    completed: false,
  },
];

export const handleGetAllTasks = async (req, res) => {
  //   TasksModel.find()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  return res.json(allTodos);
};

export const handleGetTaskById = async (req, res) => {
  const { id } = req.params;
  //   TasksModel.findById(id)
  //     .then((data) => res.json(data))
  //     .catch((error) => res.json(error));
  const task = allTodos.find((task) => task._id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  } else {
    return res.json(task);
  }
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
  //   Task.save()
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  allTodos.push(Task);
  return res.json(allTodos);
};

export const handleUpdateTask = async (req, res) => {
  //   TasksModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  const task = allTodos.find((task) => task._id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  const updatedTask = { ...task, ...req.body };
  allTodos = allTodos.map((task) =>
    task._id === req.params.id ? updatedTask : task
  );
  return res.json(updatedTask);
};

export const handleDeleteTask = async (req, res) => {
  //   TasksModel.findByIdAndDelete(req.params.id)
  //     .then((data) => {
  //       res.json(data);
  //     })
  //     .catch((error) => {
  //       res.json(error);
  //     });
  const task = allTodos.find((task) => task._id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  allTodos = allTodos.filter((task) => task._id !== req.params.id);
  return res.json(task);
};
