import User from "@/database/user.model";
import { connectToDataBase } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req:Request,route:{params:{userId:string}}) {
    try {
        await connectToDataBase();
        const body = await req.json();;
        const {userId} = route.params;

       const {searchParams} = new URL(req.url);
       const type = searchParams.get("type");

       if(type === "updateImage"){
        await User.findByIdAndUpdate(userId,body,{new:true});
        return NextResponse.json({message:"Image updated successfully"},{status:200});
       }else if(type === "updateFiles"){
        const existingUser = await User.exists({username:body.username});

        if(body.username && existingUser){
            const userNameExit = await User.exists({username:body.username});
            if(userNameExit){
                return NextResponse.json({error:"Username already exists"},{status:400});
            }
        }
        await User.findByIdAndUpdate(userId,body,{new:true});
        return NextResponse.json({message:"User updated successfully"},{status:200});
    } }catch (error) {
        const result = error as Error;
        return NextResponse.json({error: result.message},{status:500});
    }
}