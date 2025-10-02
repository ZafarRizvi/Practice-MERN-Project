import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc     Create a user
// @router   POST /api/users
// @access   Public
export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const userExists = await User.find({ email: email });
  if (userExists.length > 0) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ username, email, password });
  if (user) {
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Get all users
// @router   GET /api/users
// @access   Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});
