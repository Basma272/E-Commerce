import jwt from "jsonwebtoken";
import { UserModel } from "../models/UserModel.js";
import { asyncHandling } from "../utils/error-Handling.js";


export const verifyToken = asyncHandling(async (req, res, next) => {
  let token = req.headers.authorization || req.headers.authorization.startsWith("Bearer ");

  if (!token) {
    const error = new Error("Not auhorized , Token faild");
    error.statusCode = 403;
    throw error;
  }

  if ( token ) {
    token= token.slice(7)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
      req.user = user; 
      next();
  }


});

//  Check Admin Role
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
      next();
  }else{
   const error = new Error("Require Admin Role");
    error.statusCode = 403;
    throw error;
  }


};