import express from "express";
import * as categoryController from '../controllers/category.controller.js'
import { isAuthenticated } from "../middlewares/authentication.js";


const categoryRouter=express.Router();
categoryRouter.get('',isAuthenticated,categoryController.getCategory);
categoryRouter.post('',isAuthenticated,categoryController.createCategory);
categoryRouter.put('',isAuthenticated,categoryController.updateCategory);


export default categoryRouter;