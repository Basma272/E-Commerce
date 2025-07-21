export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,        
      stripUnknown: true,  
    });

    if (error) {
      const messages = error.details.map((err) => err.message);
      const errObj = new Error(messages.join(" "));
      errObj.statusCode = 400;
      throw errObj;
    }

    next();
  };
};