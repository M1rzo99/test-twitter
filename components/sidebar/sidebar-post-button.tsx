import { Feather } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SidebarPostButton = () => {
    <Link  href={""}/>
  return (
   <Link href={"/"}>
     <div className='flex flex-row items-center'>

{/* MOBILE POST */}
<div className='relative flex items-center justify-center p-4 rounded-full h-14 w-14 bg-sky-500 hover:bg-opacity-80 lg:hidden'>
  <Feather size={28} color="white"/>
</div>

{    /* DESKTOP POST */}
<div className='hidden w-full px-10 py-2 mt-6 rounded-full bg-sky-500 hover:bg-opacity-90 lg:block'>
  <p className='text-center font-semibold text-white text-[20px] cursor-pointer'>POST</p>
</div>
</div>

   </Link>
  )
}

export default SidebarPostButton
