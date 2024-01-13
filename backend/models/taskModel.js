const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Task field cannot be empty"],
    },
    isComplete: {
      type: Boolean,
      required: [true, "Task status cannot be empty"],
      default: false,
    },
    taskPriority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    taskCreatedAt: Date,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    timeTaskCompleted: Date,
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
