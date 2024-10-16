import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exist, you can login",
        success: false,
      });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res.status(201).json({
      message: "Signup Succesfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    console.log("user found: ", user);
    const errorMessage = "Auth failed, Email or Password is wrong.";
    if (!user) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }
    const isPassMatch = await bcrypt.compare(password, user.password);
    console.log("isPassMatch: ", isPassMatch);
    if (!isPassMatch) {
      return res.status(403).json({
        message: errorMessage,
        success: false,
      });
    }

    let jwtToken;
    try {
      jwtToken = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
    } catch (jwtError) {
      console.log("jwtError: ", jwtError);
      return res.status(500).json({
        message: "Failed to generate JWT Token",
        success: false,
      });
    }

    res.status(200).json({
      message: "login Success!",
      success: true,
      jwtToken: jwtToken,
      userName: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
export { signup, login };
