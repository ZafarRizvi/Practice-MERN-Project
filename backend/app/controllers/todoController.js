import asyncHandler from "express-async-handler";
import Todo from "../models/Todo.js";

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = asyncHandler(async (req, res) => {
  const { text, isCompleted } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Text field is required");
  }

  const todo = await Todo.create({ text, isCompleted: isCompleted || false });
  res.status(201).json({ message: "Todo created", todo });
});

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Public
export const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error(`No todo found with id '${req.params.id}'`);
  }

  res.status(200).json(todo);
});

// @desc    Update todo by ID
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodoById = asyncHandler(async (req, res) => {
  const { text, isCompleted } = req.body;

  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error(`No todo found with id ${req.params.id}`);
  }

  todo.text = text ?? todo.text;
  todo.isCompleted = isCompleted ?? todo.isCompleted;

  const updatedTodo = await todo.save();
  res.status(200).json({ message: "Todo updated successfully", updatedTodo });
});

// @desc    Delete todo by ID
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(404);
    throw new Error(`No todo found with id ${req.params.id}`);
  }

  await todo.deleteOne();
  res.status(200).json({ message: "Todo deleted", todo });
});

// @desc    Delete all todos
// @route   DELETE /api/todos
// @access  Public
export const deleteAllTodos = asyncHandler(async (req, res) => {
  const result = await Todo.deleteMany({});
  res
    .status(200)
    .json({ message: "All todos deleted", deletedCount: result.deletedCount });
});
