"use client"

import Header from '@/components/shared/header'
import useNotifications from '@/hooks/useNotifications'
import { Loader2 } from 'lucide-react'
import React from 'react'

const NotificationPage = ({params}:{params:{userId:string}}) => {
    const {data,isLoading,mutate} = useNotifications(params.userId)
    console.log(data);

  return (
<>
<Header isBack label='Notifications'/>
{isLoading ? (
<div className='flex items-center justify-center h-24'>
  <Loader2 className='animate-spin text-sky-500'/>
</div>
) : (
  <></>
)}
</>
  )
}

export default NotificationPage