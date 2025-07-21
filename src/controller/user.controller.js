import { asyncHandling } from "../utils/error-Handling.js";
import { sucssesResponse } from "../utils/respone-Handling.js";

// @desc   Get current user profile
// @route  GET /api/user/profile
// @access Private (Requires token)

export const profile = asyncHandling(async (req, res) => {
  return sucssesResponse({
    res,
    message: "User profile retrieved successfully",
    data: req.user,
  });
});