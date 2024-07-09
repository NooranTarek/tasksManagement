import { Category } from "../../database/models/category.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";




const getCategory = catchAsyncErr(async (req, res) => {
    const { categoryId } = req.query;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category retrieved successfully", category });
  });


const createCategory = catchAsyncErr(async (req, res) => {
    const {categoryName}=req.body;
    const ownedBy=req.user.user._id;
    const newCategory= await Category.create({categoryName,ownedBy});
    res.json({message:"You added new category",newCategory})
})

const updateCategory = catchAsyncErr(async (req, res) => {
    const { categoryId } = req.query;
    const { categoryName } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { categoryName },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", updatedCategory });
  });
export {createCategory,getCategory,updateCategory};