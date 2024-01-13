import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { GlobalContext } from "../../../context/UserContext";
import ProgressBar from "./ProgressBar";
import AddTaskBox from "./AddTaskBox";
import SingleTask from "./SingleTask";
import axios from "axios";
import { notify } from "../../../utils/notification";

function DashboardContent() {
  const { user } = GlobalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTask] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showAddTaskBox, setShowAddTaskBox] = useState(false);

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4070/api/v1/tasks", {
        withCredentials: true,
      });
      setTask(response.data.data);
      console.log(response);
    } catch (error) {
      notify(error.response.data.message, "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  console.log(tasks);

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

  return (
    <section className="dashboard-content">
      {showAddTaskBox ? (
        <div className="add-task-modal">
          <AddTaskBox handleHideAddTask={handleHideAddTask} />
        </div>
      ) : null}
      <div className="dashboard-side-one">
        <input
          className="dashboard-side-one--input"
          type="search"
          placeholder="Search tasks"
        />
        <p className="username-dashboard">Welcome, {user.name}</p>
      </div>
      <div className="dashboard-side-two">
        <div className="dashboard-task-info">
          <p className="dashboard-task-info-heading">
            Hello! {user.name}, You have
          </p>
          <div className="task-stats-box">
            <div className="task-stats-box-1">
              <p className="single-task-stats">
                <span className="single-task-stats-number">20</span>
                <span className="single-task-stats-status">Total Task</span>
              </p>
              <p className="single-task-stats">
                <span className="single-task-stats-number">10</span>
                <span className="single-task-stats-status">Pending Task</span>
              </p>
            </div>
            <div className="task-stats-box-2">
              <p className="single-task-stats">
                <span className="single-task-stats-number">10</span>
                <span className="single-task-stats-status">Completed Task</span>
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
        </div>
        <div className="completed-task-progress-bar">
          <ProgressBar percentage={59} />
        </div>
        <div className="calendar-box">
          <Calendar onChange={onChange} value={date} />
        </div>
      </div>
      <div className="dashboard-side-three-all-tasks">
        <SingleTask />
      </div>
    </section>
  );
}

export default DashboardContent;
