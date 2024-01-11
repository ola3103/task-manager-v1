const express = require("express");

const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/", authController.protect, taskController.createTask);
router.get("/", authController.protect, taskController.getAllTask);
router.get("/:id", authController.protect, taskController.getSingleTask);
router.patch("/:id", authController.protect, taskController.updateTask);
router.delete("/:id", authController.protect, taskController.deleteTask);

module.exports = router;
