import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify } from "../../utils/notification";
import Loader from "../dashboard/components/Loader";
import { GlobalContext } from "../../context/UserContext";

function Login() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoading, setIsloading] = useState(false);

  const { setUser } = GlobalContext();

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((formData) => {
      return { ...formData, [name]: value };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await axios.post(
        "http://localhost:4070/api/v1/auth/signin",
        { email: loginForm.email, password: loginForm.password },
        { withCredentials: true }
      );
      console.log(response);
      notify("Sign in successful", "success");
      navigate("/dashboard");
      setUser(response.data.user);
      setIsloading(false);
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      notify(error.response.data.message, "error");
      setIsloading(false);
    }
  };

  return (
    <section className="form-container">
      <form className="login-form form-general" action="">
        <a href="" className="logo">
          Taskly
        </a>
        <input
          className="login-form-email input-form-general"
          type="email"
          name="email"
          value={loginForm.email}
          onChange={(e) => handleFormChange(e)}
          placeholder="Email address"
        />
        <input
          className="login-form-password input-form-general"
          type="password"
          name="password"
          value={loginForm.password}
          onChange={(e) => handleFormChange(e)}
          placeholder="Password"
        />
        <button className="login-btn btn" onClick={(e) => handleLogin(e)}>
          Log in
        </button>
        <Link className="login-form-link" to="/forgot-password">
          Forgot password ?
        </Link>
        <hr />
        <p className="login-form-text">
          Don&apos;t have an account ? <Link to="/sign-up">Create account</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
