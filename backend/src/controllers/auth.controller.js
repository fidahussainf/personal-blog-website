import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { Role } from "../constant/index.js";
import { generateToken } from "../middlewares/auth.middleware.js";

const signupUser = async (req, res) => {

  try {
    const query = {
      email: req.body.email,
      isDeleted: false,
    };
    const userExist = await User.findOne(query);
    if (userExist) {
      return res.status(400).send({
        message: "User already exists",
      });
    }
    const adminExist = await User.findOne({
      role: Role.ADMIN,
      isDeleted: false,
    });
    if (adminExist && req.body.role === Role.ADMIN) {
      return res.status(400).send({
        message: "Admin already exists",
      });
    }
    await User.create(req.body);
    return res.status(201).send({
      message: "User created successfully",
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {

  try {
    
    const query = {
      email: req.body.email,
      isDeleted: false,
    };
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).send({
        message: "User not exits",
      });
    }
    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatched) {
      return res.status(400).send({
        message: "incorrect credential",
      });
    }
    const token = await generateToken(user._id);
    return res.status(200).send({
      message: "Logged in successfully",
      data: { token: token },
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
};
const verifyToken = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  return res.status(200).send({
    message: "Token verified",
    data: user,
  });
};

export  { signupUser, loginUser, verifyToken };
