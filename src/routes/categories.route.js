import express from "express";
import * as categoryController from '../controllers/category.controller.js'
import { isAuthenticated } from "../middlewares/authentication.js";


const categoryRouter=express.Router();
categoryRouter.get('/specific',isAuthenticated,categoryController.getCategory);
categoryRouter.get('',isAuthenticated,categoryController.getAllCategories);
categoryRouter.post('',isAuthenticated,categoryController.createCategory);
categoryRouter.put('',isAuthenticated,categoryController.updateCategory);
categoryRouter.delete('',isAuthenticated,categoryController.deleteCategory);


export default categoryRouter;