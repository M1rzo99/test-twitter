
import { LucideIcon } from 'lucide-react'
import React from 'react'

interface Props{
  label:string
  icon:LucideIcon
}

const SiderbarItem = ({icon:Icon,label}:Props) => {
  return (
    <div className='flex flex-row items-center'>
      {/* MOBILE SIDEBAR ITEM  */}
      <div className='relative flex items-center justify-center p-4 rounded-full h-14 w-14 hover:bg-sky-500 hover:bg-opacity-80 lg:hidden'>
        <Icon size={28} color="white"/>
      </div>

       {/* DESKTOP SIDEBAR ITEM  */}
       <div className='relative items-center justify-center hidden gap-4 p-4 rounded-full lg:flex h-14 hover:bg-slate-300 hover:bg-opacity-10'>
        <Icon size={28} color="white"/>
        <p className='hidden text-xl text-white lg:block'>{label}</p>
      </div>
    </div>


  )
}

export default SiderbarItem