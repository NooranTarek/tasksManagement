import express from "express";
import * as taskController from '../controllers/task.controller.js'
import { isAuthenticated } from "../middlewares/authentication.js";


const taskRouter=express.Router();

taskRouter.post('',isAuthenticated,taskController.createTask);
taskRouter.get('',isAuthenticated,taskController.getTask);


export default taskRouter;