import axios from "axios";
import { useState } from "react";
import { notify } from "../../../utils/notification";
import Loader from "./Loader";

function AddTaskBox({ handleHideAddTask, fetchTask }) {
  const [isLoading, setIsLoading] = useState(false);
  const [addTaskForm, setAddTaskForm] = useState({
    task: "",
    taskPriority: undefined,
  });

  const HandleCreateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4070/api/v1/tasks",
        {
          task: addTaskForm.task,
          taskPriority: addTaskForm.taskPriority,
        },
        { withCredentials: true }
      );
      handleHideAddTask(e);
      console.log(response);
      notify("Task added successfully", "success");
      fetchTask();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      notify(error.response.data.message, "error");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const handleAddTaskValue = (e) => {
    setAddTaskForm((prevForm) => {
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
          onClick={(e) => handleHideAddTask(e)}
          className="add-task-form-close-btn"
        >
          X
        </button>
        <div className="general-add-task-form-TD">
          <label htmlFor="add-task-description">Task Description</label>
          <textarea
            className="add-task-description"
            name="task"
            value={addTaskForm.task}
            id="add-task-description"
            rows={5}
            cols={30}
            onChange={(e) => handleAddTaskValue(e)}
          />
        </div>
        <div className="general-add-task-form-box priority-form-box">
          <label htmlFor="priority">Priority:</label>
          <select
            onChange={(e) => handleAddTaskValue(e)}
            name="taskPriority"
            value={addTaskForm.taskPriority}
            id="priority"
          >
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <button onClick={HandleCreateTask} className="add-task-form-btn btn">
          Add Task
        </button>
      </form>
    </section>
  );
}

export default AddTaskBox;
