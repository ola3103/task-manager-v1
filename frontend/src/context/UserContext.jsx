import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { notify } from "../utils/notification";
import Loader from "../Pages/dashboard/components/Loader";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4070/api/v1/auth/user/showMe",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      console.log(response);
    } catch (error) {
      notify(error.response.data.message, "error");
      navigate("/", { replace: true });
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (location.pathname !== "/") {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogoutUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.delete(
        "http://localhost:4070/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      notify(error.response.data.message, "error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      navigate("/", { replace: true });
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <UserContext.Provider value={{ user, setUser, handleLogoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const GlobalContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext };
