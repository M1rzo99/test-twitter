import User from "@/database/user.model"
import { connectToDataBase } from "@/lib/mongoose"
import { compare } from "bcrypt"
import { NextResponse } from "next/server"

export async function  POST(req:Request) {
    try {
        await connectToDataBase()
        const {email,password} = await req.json()

        const isExitingUser = await User.findOne({email})

        if(!isExitingUser){
            return NextResponse.json(
                {error:"Email does not exist"},
                {status:400}
            )
        }
        const isPasswordValid = await compare(password,isExitingUser.password)
        if(!isPasswordValid){
            return NextResponse.json(
                {error:"Password is incorrect"},
                {status:400}
            )
        }
        return  NextResponse.json({success:true,user:isExitingUser})
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}