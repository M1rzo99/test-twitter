import Form from '@/components/shared/form'
import Header from '@/components/shared/header'
import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function Page() {
  const session:any = await getServerSession(authOptions)
  return (
    <>
        <Header label='Home' isBack/>
        <Form placeholder="What's on your mind?"
        user={JSON.parse(JSON.stringify(session.user))}
        />
    </>
  )
}