"use client"
import { IUser } from "@/types";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props{
    placeholder:string;
    user:IUser
}

const Form =({placeholder,user}:Props)=>{
const [body,setBody]=useState("")
const [isLoading,setIsLoading] = useState(false)
 const onSubmit = async()=>{}

return(
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            <div className="flex flex-row gap-4">
            <Avatar>
           < AvatarImage src={user.profileImage} />
             <AvatarFallback className="text-white bg-neutral-700">
            {user.name?.split(" ").at(-1)?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
              </Avatar>
        <div className="w-full"></div>
            </div>
    </div>
)
}
export default Form