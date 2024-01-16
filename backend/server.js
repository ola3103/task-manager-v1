require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const authRouter = require("./routers/authRouter");
const taskRouter = require("./routers/taskRouter");
const CustomError = require("./errors/customError");
const globalErrorHandler = require("./controllers/globalErrorHandler");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);
app.all("*", (req, res) => {
  throw new CustomError(`cannot find ${req.originalUrl} on this server`, 404);
});

app.use(globalErrorHandler);

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));

process.on("unhandledRejection", (err) => {
  console.log("UNCAUGHT REJECTION");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT Exception");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
