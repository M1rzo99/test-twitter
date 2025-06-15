import Comment from "@/database/comment.model";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request,
    route:{params:{commentId:string}}
){
    try {
        await connectToDataBase()
        const {commentId}=route.params
        await Comment.findByIdAndDelete(commentId)
        return NextResponse.json({message:"Comment deleted"})
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}