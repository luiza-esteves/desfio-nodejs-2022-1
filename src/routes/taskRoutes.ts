import { Router, Request, Response } from "express";
import TaskController from "../controllers/TaskController";

const taskRoutes = Router();

const taskController = new TaskController();

taskRoutes.post("/", (req, res) => {
    taskController.createTask(req, res);
});
taskRoutes.get("/allTasks", (req, res) => {
    taskController.getAllTasks(req, res);
});
taskRoutes.patch("/", (req, res) => {
    taskController.updateTask(req, res);
});
taskRoutes.delete("/", (req, res) => {
    taskController.deleteTask(req, res);
});

export default taskRoutes;