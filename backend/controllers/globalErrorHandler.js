const globalErrorHandler = (err, req, res, next) => {
  const errorObject = {
    statusCode: err.statusCode || 500,
    msg: err.message || "Sorry something went wrong try again later",
    status: err.status || "error",
  };

  if (err.name === "ValidationError") {
    const errorString = Object.values(err.errors).map((el) => el.message);
    errorObject.message = `Invalid input data: ${errorString.join(" .")}`;
    errorObject.statusCode = 400;
  }

  if (err.code === 11000) {
    const value = Object.keys(err.keyValue);
    errorObject.statusCode = 400;
    errorObject.msg = `Duplicate field value: ${value}, please use another value`;
  }

  if (err.name === "CastError") {
    errorObject.statusCode = 400;
    errorObject.msg = `no ${err.path} matching ${err.value}`;
  }

  if (err.name === "JsonWebTokenError") {
    errorObject.statusCode = 400;
    errorObject.msg = "Invalid token, please log in again";
  }

  if (err.name === "TokenExpiredError") {
    errorObject.statusCode = 400;
    errorObject.msg = "Your token has expired, please log in again";
  }

  return res.status(errorObject.statusCode).json({
    status: errorObject.statusCode,
    message: errorObject.msg,
    stack: err.stack,
    error: err,
  });
};

module.exports = globalErrorHandler;
