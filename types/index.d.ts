export interface IUser{
    createdAt:Date;
    username:string;
    email:string;
    name:string;
    profileImage:string;
    coverImage:string;
    updateAt:Date;
    _id:string;
    bio:string;
    location:string;
    followers:string[];
    followingd:string[];
    hasNewNotifications:boolean;
    notifications:string[];
    isFollowing:boolean
}
// types/next-auth.d.ts

import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    currentuser?: any // yoki agar User modeli tipiga ega bo‘lsa: currentuser?: UserType
  }
}
