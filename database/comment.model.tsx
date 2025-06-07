import mongoose from "mongoose";

const CommmentSchema = new mongoose.Schema(
    {
        body:String,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    },
    {timestamps:true}
)

const Comment = mongoose.models.Comment || mongoose.model("Comment",CommmentSchema)
export default Comment