"use client"
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { sliceText } from "@/lib/utils";
import { IUser } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "../ui/button";
import axios from "axios";


interface Props{
  user:IUser;
  onchangeFollowing?:(user:IUser[])=>void;
  isFollow?:boolean;
  following?:IUser[];
}

const User = ({ user,onchangeFollowing,isFollow,following }: Props) => {
  const [isLoading,setIsLoading] = useState(false)
  const {data:session}:any = useSession()
  const router = useRouter()

  const onUnFollow = async ()=>{

  }

  const onFollow = async()=>{
 try {
         setIsLoading(true)
       await axios.put("/api/follows",{userId:user._id,currentUserId:session.currentUser._id})
        const updatedFollowing = [...(following as IUser[]),user]
        onchangeFollowing && onchangeFollowing(updatedFollowing)
        router.refresh()
        setIsLoading(false)
       } catch (error) {
        console.log(error);
        setIsLoading(false)
       }
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2 transition rounded-md cursor-pointer hover:bg-slate-300 hover:bg-opacity-10">
      <div className="flex gap-2 cursor-pointer">
        <Avatar>
          <AvatarImage src={user.profileImage} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-sm font-semibold text-white line-clamp-1">
            {user.name}
          </p>
          <p className="text-sm text-neutral-400 line-clamp-1">
            {user.username
              ? `@${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div>
      </div>
              {isFollow && user._id !== session?.currentUser?._id ? (
                user.followers.includes(session?.currentUser?._id) ? (
                  <Button label={'Unfollow'} outline classNames="h-[30px] p-0 w-fit px-3 text-sm" disabled={isLoading} onClick={onUnFollow}/>
                ) : (
                  <Button label={'Follow'} outline classNames="h-[30px] p-0 w-fit px-3 text-sm" disabled={isLoading} onClick={onFollow}/>
                )
              ) : null
            }
    </div>
  )

};

export default User;