import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(10).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const jwtValidation = (req, res, next) => {
  console.log("req: ", req.headers);
  const auth = req.headers["authorization"];

  if (!auth) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT Token is required!", error });
  }
  try {
    const decoded = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("decoded: ", decoded);
    next();
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { signupValidation, loginValidation, jwtValidation };
