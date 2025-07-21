import Joi from "joi";
import { Uservalidate } from "../utils/generalValidation.js";

export const signupVschema = Joi.object ({
    username: Uservalidate.username.required(),
    email: Uservalidate.email.required(),
    password: Uservalidate.password.required(),
   // phone: Uservalidate.phone.required(),
   // role: Uservalidate.role.required(),
})

export const ConfirmEmailVschema = Joi.object ({
    email: Uservalidate.email.required(),
    otp: Uservalidate.otp.required(),
})

export const ReConfirmEmailVschema = Joi.object ({
    email: Uservalidate.email.required(),
})

export const loginVschema = Joi.object ({
    email: Uservalidate.email.required(),
})

export const updateUserVschema = Joi.object ({
    username: Uservalidate.username.optional(),
    phone: Uservalidate.phone.optional(),
    role: Uservalidate.role.optional(),
})

export const changePasswordVschema = Joi.object ({
        currentPassword: Uservalidate.password.required(),
        newPassword:Uservalidate.password.required(),
})