import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { notify } from "../../utils/notification";
import Loader from "../dashboard/components/Loader";
import VerifyEmailErrorPage from "./VerifyEmailErrorPage";

function VerifyEmail() {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const verifyEmail = async () => {
    setIsloading(true);
    try {
      const response = await axios.post(
        "http://localhost:4070/api/v1/auth/verify-email",
        { email: queryParams.get("email"), token: queryParams.get("token") }
      );

    } catch (error) {
      if (!queryParams.has("email") || !queryParams.has("token")) {
        navigate("/", { replace: true });
      }
      notify(error.response.data.message, "error");
      setError(true);
    }
    setIsloading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      verifyEmail();
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <VerifyEmailErrorPage />;
  }

  return (
    <div>
      <section className="form-container verify-email-box">
        <h1 className="reset-password-success">
          Email verification successful
        </h1>
        <button className="btn verify-email-btn">
          <Link to="/">Log in</Link>
        </button>
      </section>
    </div>
  );
}

export default VerifyEmail;
