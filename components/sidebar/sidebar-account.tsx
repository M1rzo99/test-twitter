"use client"
import React from 'react'
import { RiLogoutCircleLine } from "react-icons/ri"
import  {signOut} from "next-auth/react"
import { IUser } from '@/types'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MoreHorizontal } from 'lucide-react'


interface Props{
  user:IUser
}
const  SidebarAccount = ({user}:Props) =>{
  return(
    <>
    {/* MOBILE SIDEBAR ACCOUNT */}
    <div className='block lg:hidden'>
      <div className='flex items-center justify-center p-4 mt-6 transition bg-red-500 rounded-full cursor-pointer lg:hidden h-14 w-14 hover:bg-opacity-80' onClick={()=>signOut()}>
          <RiLogoutCircleLine size={24} color='white'/>
      </div>
    </div>

    {/* MOBILE SIDEBAR ACCOUNT */}
    <Popover>
    <PopoverTrigger className='hidden w-full cursor-pointer hover:bg-slate-300 lg:block hover:bg-opacity-10'>
      <div className='flex flex-col justify-between gap-2'>
        <div className='flex gap-2 '>
              {/* avatar hisoblanadi */}
        <Avatar>
    <AvatarImage src={user.profileImage} />
      <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      <div className='flex flex-col items-start text-white '>
      <p className="text-sm font-medium truncate max-w-[100px]">
              {user.name.split(" ")[0]}
            </p>
        {user.username ? (
          <p  className='opacity-40'> {user.username}</p>
        ): (
          <p  className='opacity-40 whitespace-nowrap max-w-[120px]'>Manage account</p>
        )}
      </div>
         {/* ... nuqtacha hisoblanadi */}
         <MoreHorizontal size={24} color='white'/>
        </div>
      </div>
    </PopoverTrigger>
    {/* accontni ustigga bosganda logout btn chiqaradi */}
    <PopoverContent className='hidden w-full px-0 mb-3 bg-black border-none shadow lg:block rounded-2xl shadow-white'>
  <div
    className='p-4 font-bold text-white transition cursor-pointer hover:bg-slate-300 hover:bg-opacity-10'
    onClick={() => {
      console.log("Logging out...");
      signOut();
    }}
  >
    Log out: {user.username ? `@${user.username}` : user.name.split("", 5)}
  </div>
</PopoverContent>

    </Popover>

    </>
    )
}

export default SidebarAccount
