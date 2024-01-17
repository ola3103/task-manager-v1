import axios from "axios";
import { useState } from "react";
import { notify } from "../../utils/notification";
import { useNavigate } from "react-router-dom";
import Loader from "../dashboard/components/Loader";

function ForgotPassword() {
  const [formValue, setFormValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4070/api/v1/auth/forgot-password",
        {
          email: formValue,
        }
      );
      navigate("/reset-password-sent");
    } catch (error) {
      notify(error.response.data.message, "error");
      navigate("/");
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="form-container">
      <form className="forgot-password-form form-general">
        <input
          className="input-form-general"
          type="email"
          name="email"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter your email address"
          autoComplete="off"
        />
        <button
          onClick={(e) => handleResetPassword(e)}
          className="btn forgot-password-btn"
        >
          Send reset password link
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;
