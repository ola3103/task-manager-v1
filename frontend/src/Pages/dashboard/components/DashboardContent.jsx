import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GlobalContext } from "../../../context/UserContext";
import ProgressBar from "./ProgressBar";
import AddTaskBox from "./AddTaskBox";
import SingleTask from "./SingleTask";
import { GlobalTaskContext } from "../../../context/TaskContext";

function DashboardContent() {
  const { user } = GlobalContext();
  const { tasks, fetchTask, taskStat } = GlobalTaskContext();

  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showAddTaskBox, setShowAddTaskBox] = useState(false);

  const allTask = tasks.map((task) => {
    return <SingleTask key={task._id} task={task} fetchTask={fetchTask} />;
  });

  const handleShowAddTask = () => {
    setShowAddTaskBox(true);
  };

  const handleHideAddTask = (e) => {
    e.preventDefault();
    setShowAddTaskBox(false);
  };

  const onChange = (date) => {
    setDate(date);
  };

  const completedTask = taskStat.filter(
    (task) => task.taskStatus === "completed"
  );

  const pendingTask = taskStat.filter(
    (task) => task.taskStatus !== "completed"
  );

  const completedPercentage = Math.ceil(
    (completedTask.length / taskStat.length) * 100
  );

  return (
    <section className="dashboard-content">
      {showAddTaskBox ? (
        <div className="add-task-modal">
          <AddTaskBox
            handleHideAddTask={handleHideAddTask}
            fetchTask={fetchTask}
          />
        </div>
      ) : null}
      <div className="dashboard-side-two">
        <div className="dashboard-task-info">
          <p className="dashboard-task-info-heading">
            Hello! {user.name}, You have
          </p>
          <div className="task-stats-box">
            <p className="single-task-stats">
              <span className="single-task-stats-number">
                {taskStat.length}
              </span>
              <span className="single-task-stats-status">Total Task</span>
            </p>
            <p className="single-task-stats">
              <span className="single-task-stats-number">
                {completedTask.length}
              </span>
              <span className="single-task-stats-status">Completed Task</span>
            </p>
            <p className="single-task-stats">
              <span className="single-task-stats-number">
                {pendingTask.length}
              </span>
              <span className="single-task-stats-status">Pending Task</span>
            </p>
            <button
              onClick={handleShowAddTask}
              className="single-task-stats single-task-stats-btn"
            >
              <span className="single-task-stats-number">+</span>
              <span className="single-task-stats-status">Add New Task</span>
            </button>
          </div>
        </div>
        <div className="completed-task-progress-bar">
          <ProgressBar
            percentage={taskStat.length === 0 ? 0 : completedPercentage}
          />
        </div>
      </div>
      <div className="dashboard-side-three-all-tasks">{allTask}</div>
    </section>
  );
}

export default DashboardContent;
