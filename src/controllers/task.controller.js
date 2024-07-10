import { Category } from "../../database/models/category.js";
import { Task } from "../../database/models/task.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";





const createTask = catchAsyncErr(async (req, res) => {
    const { title, type, content, shared, categoryId } = req.body;
    const createdBy = req.user.user._id;
      const category = await Category.findOne({ _id: categoryId, ownedBy: createdBy });
    if (!category) {
      return res.status(404).json({ message: "Category not found or you do not have permission to use this category" });
    }
      const newTask = await Task.create({ title, type, content, shared, category: categoryId, createdBy });
    res.json({ message: "You added a new task", newTask });
  });
export {
    createTask
}