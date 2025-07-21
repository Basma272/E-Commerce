export const sucssesResponse = ({ res, message = "Success", data = {}, status = 200 }) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};