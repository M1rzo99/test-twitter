"use client"
import { IPost, IUser } from "@/types" 
import React, { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sliceText } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { formatDistanceToNowStrict } from "date-fns"
import { FaHeart } from "react-icons/fa6"
import { AiFillDelete } from "react-icons/ai"
import axios from "axios"

interface Props{
  comment:IPost;
  user:IUser;
  setComments:React.Dispatch<React.SetStateAction<IPost[]>>;
  comments:IPost[];
}


const CommentItem = ({comment,user,setComments,comments}:Props)=>{
    const [isLoading,setIsLoading] = useState(false)

    const onLike = async()=>{
       try {
        setIsLoading(true)
       if(comment.hasLiked){
        await axios.delete(`/api/comments`,{
          data:{commentId:comment._id}
        })
            const updatedComments = comments.map((c)=>{
              if(c._id === comment._id){
                  return {
                    ...c,
                    hasLiked:false,
                    likes:c.likes - 1
                  }
              }
              return c;
            })
            setComments(updatedComments)
       }else{
        await axios.put("/api/comments",{commentId:comment._id})
            const updatedComments = comments.map((c)=>{
              if(c._id === comment._id){
                  return {
                    ...c,
                    hasLiked:true,
                    likes:c.likes + 1
                  }
              }
              return c
            })
            setComments(updatedComments)
       }
    setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        
      }
    }

    const onDelete= async()=>{
      try {
        setIsLoading(true)
        await axios.delete(`/api/comments`,{
          data:{commentId:comment._id}
        })

        setComments((prev)=>prev.filter((c)=>c._id !==comment._id))
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        
      }
    }

   return(
      <div className='border-b-[1px]  relative p-5 cursor-pointer hover:bg-neutral-900 transition'>
       {isLoading && ( 
       <div className=' absolute inset-0 w-full h-full border-neutral-800 opacity-50'>
         <div className='flex justify-center items-center h-full border-neutral-800'>
               <Loader2 className='animate-spin text-sky-500'/>
    </div>
      </div>
       )}
     {comment?.user && (
  <div className='flex flex-col gap-3'>
    <div className="flex flex-row  items-center gap-2 cursor-pointer" >
      <Avatar>
      <AvatarImage src={comment?.user.profileImage} />
      <AvatarFallback>{comment?.user.name[0]}</AvatarFallback>
    </Avatar>
      <p className="font-semibold text-white cursor-pointer hover:underline">
        {comment?.user.name}
      </p>
      <span className="hidden cursor-pointer text-neutral-500 hover:underline md:block">
        {comment && comment?.user.username
          ? `@${sliceText(comment.user.username, 16)}`
          : comment && sliceText(comment.user.email, 16)}
      </span>
      <span className='text-neutral-500 text-sm'>
              {/* postni qachon qo'yganligini bildiradi */}
              {formatDistanceToNowStrict(new Date(comment.createdAt))} ago
            </span>
    </div>
      <div className='px-4 text-white mt-2'> {comment.body}</div>  

      <div className='px-4 flex flex-row items-center mt-3 gap-10'>
            
      
            <div className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`} onClick={onLike}>
              <FaHeart size={20} color={comment.hasLiked ? "red" : ""}/>
              <p>{comment.likes || 0}</p>
            </div>
      
            {comment.user._id === user._id &&(
              <div className={`flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500`} onClick={onDelete}>
                <AiFillDelete size={20} />
              </div>
            )}
           </div>
  </div>
)}    
    </div>
   )
}
export default CommentItem