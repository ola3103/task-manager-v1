const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
      unique: [true, "Please use another email, this email already exist"],
      validate: {
        validator: validator.isEmail,
        message: (props) =>
          `${props.value} is not a valid email, please a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be greater than 6 characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpiresIn: Date,
    verified: Date,
    passwordResetToken: String,
    passwordResetTokenExpiresIn: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (inputedPassword) {
  return await bcrypt.compare(inputedPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
