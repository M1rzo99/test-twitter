import Comment from "@/database/comment.model"
import Post from "@/database/post.model"
import User from "@/database/user.model"
import { connectToDataBase } from "@/lib/mongoose"
import { NextResponse } from "next/server"

export async function GET(req:Request,route:{params:{postId:string}}){
    try {
        await connectToDataBase()
        const {postId} = route.params

        const post = await Post.findById(postId).populate({
            path:"comments",
            model:Comment,
            populate:{
            select:"name email profileImage _id username",
            path:"user",
            model:User
            }
        }).sort({createdAt:-1})
        return NextResponse.json(post.comments)
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}