import { connectToDataBase } from "@/lib/mongoose";
import User  from "@/database/user.model";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
    await connectToDataBase()
    const {email,password,username,name}= await req.json()
    await User.create({email,password,username,name})
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}