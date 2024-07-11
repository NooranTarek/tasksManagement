import { Category } from "../../database/models/category.js";
import { Task } from "../../database/models/task.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";





const createTask = catchAsyncErr(async (req, res) => {
    const { title, type, content, shared, categoryId,contentList } = req.body; 
    const createdBy = req.user.user._id;
    const category = await Category.findOne({ _id: categoryId, ownedBy: createdBy });
    console.log(category);
    if (!category) {
      return res.status(404).json({ message: "Category not found or you do not have permission to use this category" });
    }
    const newTask = await Task.create({ title, type, content, shared, categoryId, createdBy ,contentList: type === 'list' ? contentList.map(item => ({ text: item })) : [],});
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

const getUserTasks = catchAsyncErr(async (req, res) => {
    const createdBy = req.user.user._id;
    const task = await Task.find({createdBy});
    if (!task) {
      return res.status(404).json({ message: "Tasks not found" });
    }
    res.status(200).json({ message: "Tasks retrieved successfully", task });
  });

  const updateTask = catchAsyncErr(async (req, res) => {
    const { taskId } = req.params;
    const { title, type, content, shared, contentList } = req.body;
    const createdBy = req.user.user._id;
    
    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy },
      { title, type, content, shared, contentList: type === 'list' ? contentList.map(item => ({ text: item })) : [] },
      { new: true, runValidators: true }
    );
  
    if (!task) {
      return res.status(404).json({ message: "Task not found or you do not have permission to update this task" });
    }
  
    res.status(200).json({ message: "Task updated successfully", task });
  });
  
  const deleteTask = catchAsyncErr(async (req, res) => {
    const { taskId } = req.params;
    const createdBy = req.user.user._id;
  
    const task = await Task.findOneAndDelete({ _id: taskId, createdBy });
  
    if (!task) {
      return res.status(404).json({ message: "Task not found or you do not have permission to delete this task" });
    }
  
    res.status(200).json({ message: "Task deleted successfully" });
  });
export {
    createTask,
    getTask,
    getUserTasks,
    updateTask,
    deleteTask
}