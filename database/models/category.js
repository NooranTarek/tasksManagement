import mongoose, { Schema } from "mongoose";




const categorySchema=new mongoose.Schema({
    ownedBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
        
    },
    categoryName:{
        type:String,
        required:true,
        unique:true
    }
})

export const Category= mongoose.model("Category",categorySchema)