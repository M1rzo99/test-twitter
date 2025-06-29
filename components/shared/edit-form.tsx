"use client"
import { userSchema } from '@/lib/validation'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import {  useForm } from 'react-hook-form'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Textarea } from '../ui/textarea'
import Button from '../ui/button'
import { Input } from '../ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import useEditModal from '@/hooks/useEditModal'
import { toast } from '@/hooks/use-toast'

interface Props{
    user:IUser
}

const EditForm = ({ user }: Props) => {
  const router = useRouter()
  const editModal = useEditModal()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || ""
    }
  })

  const { isSubmitting } = form.formState

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    try {
      await axios.put(`/api/users/${user._id}?type=updateFiles`, values)
      router.refresh()
      editModal.onClose()
    } catch (error: any) {
      if (error.response?.data?.error) {
        return toast({
          title: "Error",
          description: error.response.data.error,
          variant: "destructive"
        })
      } else {
        return toast({
          title: "Error",
          description: "Something went wrong, please try again later",
          variant: "destructive"
        })
      }
    }
  }

  // 🔥 Bu return JSX elementni qaytaryapti
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 relative -top-8 mx-4'> 
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Qolgan form field lar */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Bio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Location" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={isSubmitting}
          secondary
          label={"Save"}
          large
          fullWidth
        />
      </form>
    </Form>
  )
}


export default EditForm