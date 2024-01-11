import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notification";
import axios from "axios";

function Register() {
  const [registerFormData, setRegisterFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegisterForm = (e) => {
    const { name, value } = e.target;
    setRegisterFormData((registerData) => {
      return { ...registerData, [name]: value };
    });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4070/api/v1/auth/signup", {
        name: registerFormData.fullName,
        email: registerFormData.email,
        password: registerFormData.password,
      });
      console.log(res);
      navigate("/check-email", { replace: true });
    } catch (error) {
      notify(error.response.data.message, "error");
      console.log(error);
    }
  };

  return (
    <section className="form-container">
      <form className="register-form form-general" action="">
        <a href="" className="logo">
          Taskly
        </a>
        <h2 className="register-heading">Sign Up</h2>
        <p className="register-subheading">It&apos;s quick and easy.</p>
        <hr className="register-line" />
        <input
          className="input-form-general"
          type="text"
          placeholder="Full Name"
          name="fullName"
          value={registerFormData.fullName}
          onChange={(e) => handleRegisterForm(e)}
        />
        <input
          className="input-form-general"
          type="email"
          placeholder="Email"
          name="email"
          value={registerFormData.email}
          onChange={(e) => handleRegisterForm(e)}
        />
        <input
          className="input-form-general"
          type="password"
          placeholder="Password"
          name="password"
          value={registerFormData.password}
          onChange={(e) => handleRegisterForm(e)}
        />
        <button className="create-account-btn btn" onClick={handleRegisterUser}>
          Create Account
        </button>
        <p className="register-form-text">
          Already have an account ? <Link to="/">Log in</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
