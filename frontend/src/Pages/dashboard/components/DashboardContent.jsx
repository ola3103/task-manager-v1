import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoTimeOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GlobalContext } from "../../../context/UserContext";
import { MdOutlinePendingActions } from "react-icons/md";
import ProgressBar from "./ProgressBar";
import AddTaskBox from "./AddTaskBox";

function DashboardContent() {
  const { user } = GlobalContext();

  const [date, setDate] = useState(new Date());
  const [showAddTaskBox, setShowAddTaskBox] = useState(false);

  const handleShowAddTask = () => {
    setShowAddTaskBox(true);
  };

  const handleHideAddTask = (e) => {
    e.preventDefault();
    setShowAddTaskBox(false);
  };

  console.log(showAddTaskBox);

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
        <div className="single-task">
          <div className="single-task-top-part">
            <p className="single-task-time">
              <IoTimeOutline /> <span>14 Dec 15:39</span>
            </p>
            <p className="single-task-priority">
              Priority: <span>High</span>
            </p>
          </div>
          <div className="single-task-description-box">
            <input
              className="completed-checkbox"
              type="checkbox"
              name="completed"
              id="completed"
            />
            <p className="single-task-description">To wash my car</p>
          </div>
          <div className="single-task-bottom-part">
            <div className="task-status-box">
              <p className="task-status-icon">
                <MdOutlinePendingActions />
              </p>
              <p className="task-status-text">Pending</p>
            </div>
            <button className="general-task-btn edit-task-btn">
              <PiNotePencil />
              <span>edit</span>
            </button>
            <button className="general-task-btn delete-task-btn">
              <RiDeleteBin6Line />
              <span>delete</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardContent;
