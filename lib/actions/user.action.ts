"use server"
import User from "@/database/user.model"
import { connectToDataBase } from "../mongoose"

export async function  getUserById(userId:string) {
    try {
        await connectToDataBase()
        const user = await User.findById(userId)

        const filteredUser = {
            _id:user._id,
            name:user.name,
            email:user.email,
            coverImage:user.coverImage,
            profileImage:user.profileImage,
            username:user.username,
            bio:user.bio,
            location:user.location,
            createdAt:user.createdAt,
            followers:user.followers?.lenght || 0,
            following:user.following?.lenght || 0
        }
        return filteredUser
    } catch (error) {
        throw error
    }
}