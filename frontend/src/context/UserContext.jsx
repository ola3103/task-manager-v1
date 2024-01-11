import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../utils/notification";
import Loader from "../Pages/dashboard/components/Loader";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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
      // navigate("/", { replace: true });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const GlobalContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext };
