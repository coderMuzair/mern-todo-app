import { Router } from "express";
import {signupValidation, loginValidation, jwtValidation} from "../middlewares/authValidation.js";
import { addTodo, fetchTodos, updateTodo, deleteTodo } from "../controllers/todoController.js";
import {signup, login} from "../controllers/authController.js";

const router = Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/home", jwtValidation,  fetchTodos);
router.post("/addTodo", jwtValidation,  addTodo);
router.put("/updateTodo/:id", jwtValidation,  updateTodo);
router.delete("/deleteTodo/:id", jwtValidation,  deleteTodo);


export default router