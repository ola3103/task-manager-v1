import axios from "axios";
import { useState } from "react";
import { notify } from "../../../utils/notification";
import Loader from "../components/Loader";

function EditTaskBox({ setShowEditBox, task, fetchTask }) {
  const [isLoading, setIsLoading] = useState(false);
  const [updateTaskForm, setUpdateTaskForm] = useState({
    task: task.task,
    taskStatus: task.taskStatus,
    taskPriority: task.taskPriority,
  });

  const handleHideEditTaskForm = (e) => {
    e.preventDefault();
    setShowEditBox(false);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4070/api/v1/tasks/${task._id}`,
        {
          task: updateTaskForm.task,
          taskStatus: updateTaskForm.taskStatus,
          taskPriority: updateTaskForm.taskPriority,
        },
        { withCredentials: true }
      );
      fetchTask();
      notify("Task updated successfully", "success");
      handleHideEditTaskForm(e);
      setIsLoading(false);
    } catch (error) {
      notify(error.response.data.message, "error");
      setIsLoading(false);
    }
  };

  const handleUpdateTaskForm = (e) => {
    setUpdateTaskForm((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="add-task-box">
      <form className="add-task-form">
        <button
          onClick={(e) => handleHideEditTaskForm(e)}
          className="add-task-form-close-btn"
        >
          X
        </button>
        <div className="general-add-task-form-TD">
          <label htmlFor="add-task-description">Task Description</label>
          <textarea
            className="add-task-description"
            name="task"
            value={updateTaskForm.task}
            onChange={(e) => handleUpdateTaskForm(e)}
            id="add-task-description"
            rows={5}
            cols={30}
          />
        </div>
        <div className="general-add-task-form-box priority-form-box">
          <label htmlFor="priority">Priority:</label>
          <select
            name="taskPriority"
            id="priority"
            value={updateTaskForm.taskPriority}
            onChange={(e) => handleUpdateTaskForm(e)}
          >
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="general-add-task-form-box task-status-form-box">
          <label htmlFor="taskStatus">Status:</label>
          <select
            name="taskStatus"
            id="taskStatus"
            value={updateTaskForm.taskStatus}
            onChange={(e) => handleUpdateTaskForm(e)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={(e) => handleUpdateTask(e)}
          className="add-task-form-btn btn"
        >
          Update Task
        </button>
      </form>
    </section>
  );
}

export default EditTaskBox;
