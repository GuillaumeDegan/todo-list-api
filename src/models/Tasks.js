import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
  _id: {
    required: true,
    type: String,
  },
  title: {
    required: true,
    type: String,
  },
  completed: {
    required: true,
    type: Boolean,
  },
});

const TasksModel = mongoose.model("Tasks", tasksSchema);

export default TasksModel;
