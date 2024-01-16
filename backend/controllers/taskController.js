const CustomError = require("../errors/customError");
const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user.id,
  });

  res
    .status(201)
    .json({ status: "success", msg: "task created successfully", data: task });
};
exports.getAllTask = async (req, res) => {
  const tasks = await Task.find({ ...req.query, user: req.user.id });
  if (!tasks) {
    throw new CustomError("No task for this user");
  }
  res.status(200).json({ status: "success", data: tasks });
};

exports.getSingleTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
  if (!task) {
    throw new CustomError("task cannot be found");
  }

  res.status(200).json({ status: "success", data: task });
};
exports.updateTask = async (req, res) => {
  const { task, taskStatus, taskPriority } = req.body;

  const taskToBeUpdated = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { task, taskStatus, taskPriority },
    { new: true, runValidators: true }
  );
  if (!taskToBeUpdated) {
    throw new CustomError("task cannot be found");
  }

  res
    .status(200)
    .json({ status: "success", msg: "update task", task: taskToBeUpdated });
};

exports.deleteTask = async (req, res) => {
  const taskToBeDeleted = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!taskToBeDeleted) {
    throw new CustomError("task cannot be found");
  }
  res.status(204).json({ status: "success", msg: "task deleted successfully" });
};
