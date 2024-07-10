import { Category } from "../../database/models/category.js";
import { Task } from "../../database/models/task.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";





const createTask = catchAsyncErr(async (req, res) => {
    const { title, type, content, shared, categoryId } = req.body; 
    const createdBy = req.user.user._id;
    const category = await Category.findOne({ _id: categoryId, ownedBy: createdBy });
    console.log(category);
    if (!category) {
      return res.status(404).json({ message: "Category not found or you do not have permission to use this category" });
    }
    const newTask = await Task.create({ title, type, content, shared, categoryId, createdBy });
    res.json({ message: "You added a new task", newTask });
});



const getTask = catchAsyncErr(async (req, res) => {
    const { taskId } = req.query;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task retrieved successfully", task });
  });

export {
    createTask,
    getTask
}