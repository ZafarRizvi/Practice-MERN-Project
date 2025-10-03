import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import { userSchema } from "../../../shared/validation_schema/schema.js";

// @desc     Create a user / Signup
// @router   POST /api/users
// @access   Public
export const createUser = asyncHandler(async (req, res) => {
  const validatedData = await userSchema.parseAsync(req.body);
  const { username, email, password } = validatedData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = new User({ username, email, password });
  await user.save();
  // const user = await User.create({ username, email, password });
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
