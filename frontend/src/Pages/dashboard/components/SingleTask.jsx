import axios from "axios";
import { IoTimeOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { convertDate } from "../../../utils/convertDate";
import EditTaskBox from "./EditTaskBox";
import { useState } from "react";
import { GoChecklist } from "react-icons/go";
import { notify } from "../../../utils/notification";
import Loader from "../components/Loader";

function SingleTask({ task, fetchTask }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);

  const handleShowEditBox = () => {
    setShowEditBox(true);
  };

  let taskCompleted;
  if (task.taskStatus === "completed") {
    taskCompleted = true;
  } else {
    taskCompleted = false;
  }

  const handleDeleteTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:4070/api/v1/tasks/${task._id}`,
        { withCredentials: true }
      );
      fetchTask();
      notify("Task deleted successfully", "success");
    } catch (error) {
      notify(error.response.data.message, "error");
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`single-task ${
        taskCompleted ? "single-task-completed" : "single-task-pending"
      }`}
    >
      {showEditBox ? (
        <div className="edit-task-modal">
          <EditTaskBox
            setShowEditBox={setShowEditBox}
            task={task}
            fetchTask={fetchTask}
          />
        </div>
      ) : null}
      <div className="single-task-top-part">
        <p className="single-task-time">
          <IoTimeOutline /> <span>{convertDate(task.createdAt)}</span>
        </p>
        <p className="single-task-priority">
          Priority: <span>{task.taskPriority}</span>
        </p>
      </div>
      <p className="single-task-description">{task.task}</p>
      <div className="single-task-bottom-part">
        <div className="task-status-box">
          {taskCompleted ? (
            <>
              <p className="task-status-icon task-status-completed">
                <GoChecklist />
              </p>
              <p className="task-status-text task-status-completed">
                Completed
              </p>
            </>
          ) : (
            <>
              <p className="task-status-icon">
                <MdOutlinePendingActions />
              </p>
              <p className="task-status-text">Pending</p>
            </>
          )}
        </div>
        <button
          onClick={handleShowEditBox}
          className="general-task-btn edit-task-btn"
        >
          <PiNotePencil />
          <span>edit</span>
        </button>
        <button
          onClick={(e) => handleDeleteTask(e)}
          className="general-task-btn delete-task-btn"
        >
          <RiDeleteBin6Line />
          <span>delete</span>
        </button>
      </div>
    </div>
  );
}

export default SingleTask;
