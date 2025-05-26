// Optionslar saqalanadigon joy/githubdan ro'yhatdan o'tish un shular kerek holos

import { AuthOptions } from "next-auth";
import { connectToDataBase } from "./mongoose";
import User from "@/database/user.model";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider  from "next-auth/providers/credentials";

export const authOptions:AuthOptions={
    providers:[
        CredentialsProvider({
            name:"credetials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                await connectToDataBase()
                const user = await User.findOne({email:credentials?.email})
                return user;
            }
        }),
        GitHubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        }),
        GoogleProvider ({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks:{
        async session({session}:any){
            await connectToDataBase()
            const isExitingUser = await User.findOne({email:session.user?.email})

            if(!isExitingUser){
                const newUser = await User.create({
                    email:session.user?.email,
                    name:session.user?.name,
                    profileImage:session.user?.image
                })
                session.currentuser = newUser
            }
            session.currentuser = isExitingUser
            return session
        }
    },
    debug:process.env.NODE_ENV === "development",
    session:{strategy:"jwt"},
    jwt:{secret:process.env.NEXTAUTH_JWT_SECRET!},
    secret:process.env.NEXTAUTH_SECRET!

}
// Shu yeracham