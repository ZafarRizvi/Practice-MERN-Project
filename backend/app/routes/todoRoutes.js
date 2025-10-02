import express from "express";
import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
  deleteAllTodos,
} from "../controllers/todoController.js";

const router = express.Router();

router.route("/").post(createTodo).get(getAllTodos).delete(deleteAllTodos);

router
  .route("/:id")
  .get(getTodoById)
  .put(updateTodoById)
  .delete(deleteTodoById);

export default router;
