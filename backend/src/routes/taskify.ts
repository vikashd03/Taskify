import express from "express";
import * as todosController from "../controllers/todo";

const router = express.Router();

router.get("/todos/", todosController.getTodos);

router.get("/completedtodos/", todosController.getCompletedTodos);

router.post("/todo/", todosController.postTodo);

router.get("/todo/:id", todosController.getTodo);

router.delete("/todo/:id", todosController.deleteTodo);

router.patch("/todo/:id", todosController.patchTodo);

export default router;
