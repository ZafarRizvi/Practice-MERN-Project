import express from "express";
import {
  createUser,
  getAllUsers,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").post(createUser).get(getAllUsers);
router.route("/login").post(loginUser);

export default router;
