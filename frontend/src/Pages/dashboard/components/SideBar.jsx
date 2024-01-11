import { MdLogout } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoHourglassOutline } from "react-icons/io5";

function SideBar() {
  return (
    <section className="sidebar">
      <a href="" className="logo">
        taskly
      </a>
      <ul className="sidebar-task-status-box">
        <li className="sidebar-status-link">
          <a href="">
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
          <a href="">Completed Tasks</a>
        </li>
        <li className="sidebar-status-link">
          <span className="sidebar-status-link-icon">
            <IoHourglassOutline />
          </span>
          <a href="">Pending Task</a>
        </li>
      </ul>

      <a href="" className="sidebar-profile">
        <IoSettingsOutline />
        <span>Settings</span>
      </a>
      <a href="" className="sidebar-logout-btn">
        <MdLogout />
        <span>logout</span>
      </a>
    </section>
  );
}

export default SideBar;
