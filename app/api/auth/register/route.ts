import { connectToDataBase } from "@/lib/mongoose";
import User  from "@/database/user.model";
import { NextResponse } from "next/server";
import {hash} from "bcrypt"

export async function POST(req:Request) {
    try {
    await connectToDataBase()
    // pastdagi qisimda register(name va eamail yuborganda email bor yoki yo'qligini tekshiramiz)
        const {searchParams} = new URL(req.url)
        const step =  searchParams.get("step")
        if(step === "1"){
            const {email}= await req.json()
            const isExitingUser = await User.findOne({email})

            if(isExitingUser){
             return NextResponse.json(
             {error:"Email already exists"},
            {status:400})}

            return NextResponse.json({success:true})

        } else if(step === "2"){
            const {email,username,password,name} = await  req.json()
            const isExitingUserName = await User.findOne({username})
            if(isExitingUserName){
                return NextResponse.json(
                    {error:"Username already exists"},
                    {status:400}
                )
            }
            const hashedPw = await hash(password,10)
            const user =await User.create({
                email,password:hashedPw,name,username
            })
            return NextResponse.json({success:true,user})
        }
        // shu yergacham
    } catch (error) {
        const result = error as Error
        return NextResponse.json({error:result.message},{status:400})
    }
}