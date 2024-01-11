import { GlobalContext } from "../../context/UserContext";
import { useNavigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = GlobalContext();
  console.log(user);
  const navigate = useNavigate();

  return user ? <Outlet /> : navigate("/", { replace: true });
}

export default ProtectedRoute;
