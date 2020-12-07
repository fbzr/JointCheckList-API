module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.errorMessage || "There was an error in the server";

  return res.status(statusCode).json({ statusCode, errorMessage });
};
