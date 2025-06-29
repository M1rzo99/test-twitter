"use client"

import useEditModal from "@/hooks/useEditModal"
import { IUser } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileImageUpload from "../shared/profile-image-upload"
import CoverImageUpload from "../shared/cover-image-upload"
import Modal from "../ui/modal"
import { Loader2 } from "lucide-react"
import axios from "axios"
import EditForm from "../shared/edit-form"


interface Props{
    user:IUser
}

const EditModal = ({user}:Props) => {
    const [coverageImage, setCoverImage] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const editModal = useEditModal()
    const router = useRouter()

    useEffect(() => {
        setProfileImage(user.profileImage)
        setCoverImage(user.coverImage )
        
    }, [user])

    const handleImageUpload =  async (image: string,isProfileImage:boolean) => {
        setIsLoading(true)
        try {
            setIsLoading(true)
            await axios.put(`/api/users/${user._id}?type=updateImage`,{
                [isProfileImage ? "profileImage" : "coverImage"]: image
            })
            router.refresh();
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const bodyContent=(
        <>
        {isLoading &&(
            <div className="absolute z-10 h-[30px] bg-black opacity-50 left-0 top-12 right-0 flex justify-center items-center">
                <Loader2 className="animate-spin text-sky-500"/>
            </div>
        )}
        <CoverImageUpload coverImage={coverageImage} onChange={image=>handleImageUpload(image,false)}/>
        <ProfileImageUpload profileImage={profileImage} onChange={image=>handleImageUpload(image,true)}/>

            <EditForm user={user} />
        </>
    )

    return (
        <Modal
        body={bodyContent}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        />
    )
}

export default EditModal