import Post from "@/database/post.model"
import User from "@/database/user.model"
import { connectToDataBase } from "@/lib/mongoose"
import { NextResponse } from "next/server"
 
// POST imizni create   qilish un api
export async function POST(req:Request){ 
    try {
        await connectToDataBase()
        const {body,userId } = await req.json()
        const post = await Post.create({body, user:userId})
        return NextResponse.json(post)
    } catch (error) {
        const result= error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
    
}
// POST imizni create   qilish un api shu yergacha

export async function GET(req:Request){
    try {
        await connectToDataBase()
        const {searchParams} = new URL(req.url)
        const limit = searchParams.get("limit")
        const posts = await Post.find({})
        .populate({
            path: "user",
            model: User,
            select: "name email profileImage _id username"
        })
        .limit(Number(limit))
        .sort({createdAt: -1})
        return NextResponse.json(posts)
    } catch (error) {
        const result= error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}

// Delete qilish un
export async function DELETE(req:Request){
    try {
        await connectToDataBase()
        const {postId,userId} = await req.json()
        await Post.findByIdAndDelete(postId)
        return  NextResponse.json({message:"Post deleted successfully"})
    } catch (error) {
        const result= error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}
