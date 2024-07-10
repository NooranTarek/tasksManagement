import express from "express";
import userRouter from "./user.route.js";
import categoryRouter from "./categories.route.js";
import taskRouter from "./task.route.js";


const router = express.Router();

router.use("/users", userRouter);
router.use("/categories", categoryRouter);
router.use("/tasks", taskRouter);


export default router;
