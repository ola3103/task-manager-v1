import { MdLogout } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoHourglassOutline } from "react-icons/io5";
import { GlobalTaskContext } from "../../../context/TaskContext";
import axios from "axios";
import { notify } from "../../../utils/notification";
import { GlobalContext } from "../../../context/UserContext";

function SideBar() {
  const { fetchTask, setTasks } = GlobalTaskContext();
  const { handleLogoutUser } = GlobalContext();

  const handleCompletedTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:4070/api/v1/tasks?taskStatus=completed",
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  };

  const handlePendingTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:4070/api/v1/tasks?taskStatus=pending",
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.data);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  };

  const handleAllTask = (e) => {
    e.preventDefault();
    fetchTask();
  };
  return (
    <section className="sidebar">
      <a href="" className="logo">
        taskly
      </a>
      <ul className="sidebar-task-status-box">
        <li className="sidebar-status-link">
          <a href="" onClick={(e) => handleAllTask(e)}>
            <span className="sidebar-status-link-icon">
              <FaList />
            </span>
            All Tasks
          </a>
        </li>
        <li className="sidebar-status-link">
          <span className="sidebar-status-link-icon">
            <IoCheckmarkDone />
          </span>
          <a href="" onClick={(e) => handleCompletedTask(e)}>
            Completed Tasks
          </a>
        </li>
        <li className="sidebar-status-link">
          <span className="sidebar-status-link-icon">
            <IoHourglassOutline />
          </span>
          <a href="" onClick={(e) => handlePendingTask(e)}>
            Pending Task
          </a>
        </li>
      </ul>

      <a
        href=""
        onClick={(e) => handleLogoutUser(e)}
        className="sidebar-logout-btn"
      >
        <MdLogout />
        <span>logout</span>
      </a>
    </section>
  );
}

export default SideBar;
