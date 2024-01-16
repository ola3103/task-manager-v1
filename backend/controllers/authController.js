const User = require("../models/userModel");
const CustomError = require("../errors/customError");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendResetPasswordLink = require("../utils/sendPasswordResetEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new CustomError("No token available , please log in", 401);
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(payload.id);
  if (!currentUser) {
    throw new CustomError("This user no longer exist", 400);
  }

  req.user = payload;
  next();
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new CustomError("Please provide all fields", 400);
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new CustomError(
      "Please use another email, this email already exist",
      400
    );
  }
  const beforeHashedToken = crypto.randomBytes(40).toString("hex");
  const verificationToken = crypto
    .createHash("sha256")
    .update(beforeHashedToken)
    .digest("hex");
  const user = await User.create({
    name,
    email,
    password,
    verificationToken,
    verificationTokenExpiresIn: Date.now() + 10 * 60 * 1000,
  });

  try {
    const verificationUrl = `${req.protocol}://localhost:5173/verify-email?token=${user.verificationToken}&email=${user.email}`;

    await sendVerificationEmail({
      name: user.name,
      email: user.email,
      url: verificationUrl,
    });
  } catch (error) {
    user.verificationToken = undefined;
    user.verificationTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    throw new CustomError("Error trying to send email", 500);
  }

  res.status(201).json({
    status: "success",
    msg: "Check your email to verify your email",
  });
};

exports.verifyEmail = async (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    throw new CustomError("Inavalid credentials", 500);
  }

  const user = await User.findOne({
    email,
    verificationTokenExpiresIn: { $gt: Date.now() },
  }).select("-password -confirmPassword");

  if (!user) {
    user.verificationTokenExpiresIn = undefined;
    user.verificationToken = undefined;
    throw new CustomError(
      "Your token has expire kindly request another token",
      400
    );
  }

  if (user.verificationToken !== token) {
    throw new CustomError("Verification failed", 400);
  }

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = undefined;
  user.verificationTokenExpiresIn = "";
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    msg: "Registration successful, please log in to continue",
  });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Please provide email and password", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Please provide valid email or password", 400);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError("Please provide valid email or password", 400);
  }

  if (!user.isVerified) {
    throw new CustomError("Please verify your email", 401);
  }

  const jwtObject = {
    id: user._id,
    name: user.name,
  };

  const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
    // path: "/",
  });

  res
    .status(200)
    .json({ status: "success", msg: `Welcome ${user.name}`, user: jwtObject });
};

exports.updateUserData = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new CustomError("Please provide the name field", 400);
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { name },
    { new: true, runValidators: true }
  ).select("-password");

  const jwtObject = {
    id: user._id,
    name: user.name,
  };

  const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  });

  res
    .status(200)
    .json({ status: "success", msg: "data updated successfully", data: user });
};

exports.updateUserPassword = async (req, res) => {
  const { password, newPassword, confirmPassword } = req.body;

  if (!password || !newPassword || !confirmPassword) {
    throw new CustomError("Please provide the all field", 400);
  }

  const user = await User.findOne({ _id: req.user.id });
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError("Please provide correct password", 400);
  }
  if (newPassword !== confirmPassword) {
    throw new CustomError("Password does not match");
  }

  user.password = newPassword;
  await user.save();

  const jwtObject = {
    id: user._id,
    name: user.name,
  };

  const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  });

  res
    .status(200)
    .json({ status: "success", msg: "Pasword updated successfully" });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new CustomError("Please input your email", 400);
  }

  const user = await User.findOne({ email });

  try {
    user.passwordResetToken = crypto.randomBytes(40).toString("hex");
    user.passwordResetTokenExpiresIn = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const passwordResetLink = `${req.protocol}://localhost:5173/reset-password?token=${user.passwordResetToken}&email=${user.email}`;
    await sendResetPasswordLink({
      email: user.email,
      name: user.name,
      url: passwordResetLink,
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresIn = undefined;
    await user.save({ validateBeforeSave: false });
    throw new CustomError("Error sending email, please try again", 500);
  }

  res.status(200).json({
    status: "success",
    msg: "check your email for password reset link",
  });
};

exports.resetPassword = async (req, res) => {
  const { token, email, password, confirmPassword } = req.body;
  if (!token || !email) {
    throw new CustomError("Validation failed", 401);
  }

  const user = await User.findOne({
    email,
    passwordResetTokenExpiresIn: { $gt: Date.now() },
  });
  if (token !== user.passwordResetToken) {
    throw new CustomError("Invalid credentials", 400);
  }
  if (!user) {
    throw new CustomError("Password link has expired", 401);
  }

  if (password !== confirmPassword) {
    throw new CustomError("Password does not match");
  }

  user.password = password;
  user.passwordResetTokenExpiresIn = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  const jwtObject = {
    id: user._id,
    name: user.name,
  };

  const jwtToken = jwt.sign(jwtObject, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", jwtToken, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
  });

  res.status(200).json({
    status: "success",
    msg: "Password changed successfully please login to continue",
  });
};

exports.logout = async (req, res) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now()),
    httpOnly: true,
    // secure: true,
  });

  res.status(200).json({
    status: "success",
    msg: "logout successfully",
  });
};

exports.showCurrentUser = async (req, res) => {
  res.status(200).json({ status: "success", user: req.user });
};
