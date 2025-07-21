//  Middleware لحماية الـ async routes من الأخطاء
export const asyncHandling = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      error.statusCode = error.statusCode || 500;
      next(error);
    });
  };
};

export const GlobalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  if (process.env.MOOD === "dev") {
    return res.status(statusCode).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};