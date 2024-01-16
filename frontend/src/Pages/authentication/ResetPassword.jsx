import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notification";

function ResetPassword() {
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4070/api/v1/auth/reset-password",
        {
          token: queryParams.get("token"),
          email: queryParams.get("email"),
          password: passwordInput,
          confirmPassword: confirmPasswordInput,
        }
      );
      notify(
        "Password reset successful, kindly login to your account",
        "success"
      );
      navigate("/", { replace: true });
      setIsLoading(false);
    } catch (error) {
      notify(error.response.data.message, "error");
      setIsLoading(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <section className="form-container">
      <form action="" className="reset-password-form form-general">
        <input
          className="input-form-general"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter new password"
        />
        <input
          className="input-form-general"
          type="password"
          value={confirmPasswordInput}
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
          placeholder="Confirm new password"
        />
        <button
          onClick={(e) => handlePasswordReset(e)}
          className="btn reset-password-btn"
        >
          Reset Password
        </button>
      </form>
    </section>
  );
}

export default ResetPassword;
