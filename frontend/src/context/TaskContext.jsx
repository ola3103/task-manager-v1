import { createContext, useContext, useEffect, useState } from "react";
import { notify } from "../utils/notification";
import axios from "axios";
import Loader from "../Pages/dashboard/components/Loader";
import { GlobalContext } from "./UserContext";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskStat, setTaskStat] = useState([]);

  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:4070/api/v1/tasks", {
        withCredentials: true,
      });
      setTasks(response.data.data);
      setTaskStat(response.data.data);
    } catch (error) {
      notify(error.response.data.message, "error");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      fetchTask();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTask, setTasks, taskStat }}>
      {children}
    </TaskContext.Provider>
  );
};

export const GlobalTaskContext = () => {
  return useContext(TaskContext);
};

export { TaskProvider };
