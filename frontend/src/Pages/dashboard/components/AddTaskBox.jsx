function AddTaskBox({ handleHideAddTask }) {
  return (
    <section className="add-task-box">
      <form className="add-task-form">
        <button onClick={handleHideAddTask} className="add-task-form-close-btn">
          X
        </button>
        <div className="general-add-task-form-TD">
          <label htmlFor="add-task-description">Task Description</label>
          <textarea
            className="add-task-description"
            name=""
            id="add-task-description"
            rows={5}
            cols={30}
          />
        </div>
        <div className="general-add-task-form-box priority-form-box">
          <label htmlFor="priority">Priority:</label>
          <select name="" id="priority">
            <option value="">Medium</option>
            <option value="">low</option>
            <option value="">High</option>
          </select>
        </div>
        <div className="general-add-task-form-box status-form-box">
          <label htmlFor="status">Status:</label>
          <select name="" id="status">
            <option value="">Pending</option>
            <option value="">Completed</option>
          </select>
        </div>
        <button className="add-task-form-btn btn">Add Task</button>
      </form>
    </section>
  );
}

export default AddTaskBox;
