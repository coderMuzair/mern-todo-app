import TodoModel from "../models/todos.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new TodoModel({ userId: req.user._id, text });
    await newTodo.save();
    res.status(201).json({
      message: "Todo added!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const fetchTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.user._id });
    res.json(todos);
    console.log("todos: ", todos);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch todos" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todoId = req.params.id;
    const updatedTodo = await TodoModel.findOneAndUpdate(
      {
        _id: todoId,
        userId: req.user._id,
      },
      { text },
      { new: true }
    );
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }
    res
      .status(200)
      .json({
        message: "Todo updated successfully",
        success: true,
        todo: updateTodo,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to update todo", success: false });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: todoId,
      userId: req.user._id,
    });
    if (!deletedTodo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not authorized" });
    }
    res
      .status(200)
      .json({ message: "Todo deleted successfully", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete todo", success: false, error });
  }
};

export { addTodo, fetchTodos, updateTodo, deleteTodo };
