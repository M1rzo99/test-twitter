import Comment from "@/database/comment.model";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        await connectToDataBase()
        const {body,postId,userId} = await req.json()
        const comment = await Comment.create({body,post:postId,user:userId})
        return NextResponse.json(comment)
    } catch (error) {
        const result = error as Error
         return NextResponse.json({error:result.message},{status:400});
    }
}