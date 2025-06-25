"use client"

import useEditModal from "@/hooks/useEditModal"
import { IUser } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProfileImageUpload from "../shared/profile-image-upload"
import CoverImageUpload from "../shared/cover-image-upload"
import Modal from "../ui/modal"

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

    const handleImageUpload =  (image: string) => {}

    const bodyContent=(
        <>
        <CoverImageUpload coverImage={coverageImage} onChange={image=>handleImageUpload(image)}/>
        <ProfileImageUpload profileImage={profileImage} onChange={image=>handleImageUpload(image)}/>
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