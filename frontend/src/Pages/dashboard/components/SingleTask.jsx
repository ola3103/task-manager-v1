import { IoTimeOutline } from "react-icons/io5";
import { PiNotePencil } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";

function SingleTask() {
  return (
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
  );
}

export default SingleTask;
