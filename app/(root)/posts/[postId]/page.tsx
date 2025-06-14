"use client"
import CommentItem from "@/components/shared/comment-item"
import Form from "@/components/shared/form"
import Header from "@/components/shared/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sliceText } from "@/lib/utils"
import { IPost } from "@/types"
import axios from "axios"
import { formatDistanceToNowStrict } from "date-fns"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"


const Page = ({params}:{params:{postId:string}})=>{
    const {data:session,status}:any = useSession()
    const [isLoading,setIsLoading] = useState(false)
    const [isFetchingComment,SetIsFetchingComment] = useState(false)
    const [post,setPost] = useState<IPost | null>(null)
    const [comments,setComments] = useState<IPost[]>([])

    const getPost = async()=>{
        try {
            SetIsFetchingComment(true)
            const {data} = await axios.get(`/api/posts/${params.postId}`)
            setPost(data)
            SetIsFetchingComment(false)
        } catch (error) {
            console.log(error);
            SetIsFetchingComment(false)
            
        }
    }
    const getComments = async()=>{
        try {
            setIsLoading(true)
            const {data} = await axios.get(`/api/posts/${params.postId}/comments`)
             await console.log("data:",data);
            setComments(data)
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
            
        }
    }

    useEffect(()=>{
        getPost()
        getComments()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log("Comments:",comments);
    

    return(
       <> 
       <Header label="Posts" isBack/>
       {isLoading || status ===  "loading" ? (
        <div className="flex justify-center items-center h-24">
            <Loader2 className="animate-spin text-sky-500"/>
        </div>
       ) :  (
        <>
        <div className='bg-neutral-900  border-b-[1px] border-neutral-800 relative p-5 cursor-pointer  transition'>
       {isLoading && ( 
       <div className='absolute inset-0 w-full h-full bg-black opacity-50'>
    <div className='flex justify-center items-center h-full '>
      <Loader2 className='animate-spin text-sky-500'/>
    </div>
      </div>
       )}
    
     {post?.user && (
  <div className=' flex flex-col gap-3'>
    <div className="flex flex-row  items-center gap-2 cursor-pointer" >
      <Avatar>
      <AvatarImage src={post.user.profileImage} />
      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
    </Avatar>
      <p className="font-semibold text-white cursor-pointer hover:underline">
        {post.user.name}
      </p>
      <span className="hidden cursor-pointer text-neutral-500 hover:underline md:block">
        {post.user.username
          ? sliceText(post.user.username, 16)
          : sliceText(post.user.email, 16)}
      </span>
      <span className='text-neutral-500 text-sm'>
        {/* postni qachon qo'yganligini bildiradi */}
        {formatDistanceToNowStrict(new Date(post.createdAt))} ago
      </span>
    </div>
     <div className='px-4 text-white mt-2'> {post.body}</div>
     
  </div>
)}  
    </div>
       <Form  placeholder="Post your reply" user={JSON.parse(JSON.stringify(session.currentUser))}
              setPosts={setComments}
              postId={params.postId}
              isComment
            />
            {isFetchingComment? (
              <div className='flex justify-center items-center h-full '>
      <Loader2 className='animate-spin text-sky-500'/>
    </div>  ) : (
                comments.map((comment)=>(
                  <CommentItem comment={comment} key={comment._id} user={JSON.parse(JSON.stringify(session.currentUser))} comments={comments} setComments={setComments}/>
                ))
            )}
         </>
       )}
       </>
    )
}
export default Page