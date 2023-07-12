//class
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  // console.log(err.message);

  //Error
  err.message = err.message || "Internal Server Error";
  //Condition
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    success: false,
    massage: err.message,
  });
};

export default ErrorHandler;
