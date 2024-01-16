import "./App.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./Pages/authentication/ForgotPassword";
import Login from "./Pages/authentication/Login";
import Register from "./Pages/authentication/Register";
import FullDashboardContent from "./Pages/dashboard/components/FullDashboardContent";
import VerifyEmail from "./Pages/authentication/VerifyEmail";
import RegistrationSuccessful from "./Pages/authentication/RegistrationSuccessful";
import ProtectedRoute from "./Pages/authentication/ProtectedRoute";
import ResetPasswordLinkSuccess from "./Pages/authentication/ResetPasswordLinkSuccess";
import ResetPassword from "./Pages/authentication/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/check-email" element={<RegistrationSuccessful />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-sent"
          element={<ResetPasswordLinkSuccess />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<FullDashboardContent />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
