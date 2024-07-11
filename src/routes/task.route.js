import express from "express";
import * as taskController from '../controllers/task.controller.js'
import { isAuthenticated } from "../middlewares/authentication.js";


const taskRouter=express.Router();

taskRouter.post('',isAuthenticated,taskController.createTask);
taskRouter.get('',isAuthenticated,taskController.getTask);
taskRouter.get('/all',isAuthenticated,taskController.getUserTasks);
taskRouter.put('/:taskId',isAuthenticated, taskController.updateTask);
taskRouter.delete('/:taskId',isAuthenticated, taskController.deleteTask);

export default taskRouter;