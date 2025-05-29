"use client"
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IUser } from "@/types";
import { sliceText } from "@/lib/utils";

const User = ({ user }: { user: IUser }) => {
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
              ? `${sliceText(user.username, 16)}`
              : sliceText(user.email, 16)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;