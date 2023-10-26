import { Request, Response } from "express";
import todoModel from "../models/todo";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await todoModel.find({ isDone: false });
    res.status(200).json(todos.reverse());
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompletedTodos = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    try {
      const completedTodos = await todoModel.find({ isDone: true });
      res.status(200).json(completedTodos);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.send({ message: req.method + " method is not allowed" });
  }
};

export const postTodo = async (req: Request, res: Response) => {
  const todo = new todoModel({
    todo: req.body.todo,
    isDone: req.body.isDone,
  });
  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json(todo);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoModel.findByIdAndRemove(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json({ message: "deleted todo" });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const patchTodo = async (req: Request, res: Response) => {
  try {
    const todo = await todoModel.findById(req.params.id);
    if (todo == null) {
      return res.status(404).json({ message: "todo not found" });
    }
    if (req.body.todo != null) {
      todo.todo = req.body.todo;
    }
    if (req.body.isDone != null) {
      todo.isDone = req.body.isDone;
    }
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};
