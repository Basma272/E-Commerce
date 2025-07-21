import Joi from "joi";

export const Uservalidate = {
  username: Joi.string().min(2).max(20).messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 2 characters long",
    "string.max": "Username must not exceed 20 characters",
  }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "edu"] },
  }).messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),

  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
    
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must not exceed 20 characters",
      "string.pattern.base":
        "Password must contain lowercase, uppercase, and a number",
    }),

  otp: Joi.string().pattern(/^\d{6}$/).messages({
    "string.pattern.base": "OTP must be 6 digits",
    "string.empty": "OTP is required",
  }),

  phone: Joi.string()
    .pattern(/^(002|01|\+201)[0125][0-9]{8}$/)
    
    .messages({
      "string.pattern.base": "Phone must be a valid Egyptian number",
      "string.empty": "Phone is required",
    }),

  role: Joi.string().valid("customer", "admin").messages({
    "any.only": "Role must be either customer or admin",
    "string.empty": "Role is required",
  }),
};

//  Task validation schema
// export const TaskValidate = {
//   title: Joi.string().min(3).max(100).messages({
//     "string.empty": "Task title is required",
//     "string.min": "Title must be at least 3 characters",
//     "string.max": "Title must not exceed 100 characters",
//   }),

//   description: Joi.string().min(5).max(500).messages({
//     "string.empty": "Description is required",
//     "string.min": "Description must be at least 5 characters",
//     "string.max": "Description must not exceed 500 characters",
//   }),

//   dueDate: Joi.date().greater("now").optional().messages({
//     "date.base": "Due date must be a valid date",
//     "date.greater": "Due date must be in the future",
//   }),

//   status: Joi.string().valid("pending", "in-progress", "done").optional(),

//   priority: Joi.string().valid("low", "medium", "high").optional(),
// };