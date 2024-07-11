import mongoose, { Schema } from "mongoose";



const taskSchema= new mongoose.Schema({
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title: String,
    type: { type: String, enum: ['text', 'list'] },
    content: String,
    contentList:[{ text: String , _id: false}],
    isShared: Boolean
})

export const Task= mongoose.model("Task",taskSchema)