import { Category } from "../../database/models/category.js";
import { catchAsyncErr } from "../utilities/errorHandling.js";




const createCategory = catchAsyncErr(async (req, res) => {
    const {categoryName,ownedBy}=req.body;
    // const ownedBy=req.user.user._id;
    const newCategory= await Category.create({categoryName,ownedBy});
    res.json({message:"you added new category",newCategory})
})
export {createCategory};