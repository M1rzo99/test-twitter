
import { IUser } from "@/types";
import { signOut } from "next-auth/react";
import React from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  user: IUser;
}

const SidebarAccount = ({ user }: Props) => {
  return (
    <>
      {/* MOBIE SIDEBAR ACCOUNT */}
      <div className="block lg:hidden">
        <div
          className="flex items-center justify-center p-4 mt-6 transition bg-red-500 rounded-full cursor-pointer lg:hidden h-14 w-14 hover:bg-opacity-80"
          onClick={() => signOut()}
        >
          <RiLogoutCircleLine size={24} color="white" />
        </div>
      </div>

      {/* DESKTOP SIDEBAR ACCOUNT */}
      <Popover>
        <PopoverTrigger className="hidden w-full px-4 py-2 transition rounded-full cursor-pointer hover:bg-slate-300 lg:block hover:bg-opacity-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user.profileImage} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-white">
                <p>{user.name}</p>
                {user.username ? (
                  <p className="opacity-40">{user.username}</p>
                ) : (
                  <p className="opacity-40">Manage account</p>
                )}
              </div>
            </div>
            <MoreHorizontal size={24} color="white" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="px-0 mb-3 bg-black border-none shadow rounded-2xl shadow-white">
          <div
            className="p-4 font-bold text-white transition cursor-pointer hover:bg-slate-300 hover:bg-opacity-10"
            onClick={() => signOut()}
          >
            Log out: {user.username ? `@${user.username}` : user.name}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default SidebarAccount;