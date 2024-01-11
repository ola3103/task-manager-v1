function ForgotPassword() {
  return (
    <section className="form-container">
      <form action="" className="forgot-password-form form-general">
        <input
          className="input-form-general"
          type="email"
          name=""
          placeholder="Enter your email address"
        />
        <button className="btn forgot-password-btn">
          Send reset password link
        </button>
      </form>
    </section>
  );
}

export default ForgotPassword;
