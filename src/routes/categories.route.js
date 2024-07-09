import express from "express";
import * as categoryController from '../controllers/category.controller.js'


const categoryRouter=express.Router();

categoryRouter.post('',categoryController.createCategory);


export default categoryRouter;