import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback, useState } from 'react'
import Modal from '../ui/modal'
import { loginSchema } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Button from '../ui/button'
import useRegisterModal from '@/hooks/useRegisterModal'
import axios from 'axios'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function LoginModal() {
    const [error,setError] = useState("")
    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const onToggle = useCallback(()=>{
        loginModal.onClose();
        registerModal.onOpen()
    },[loginModal,registerModal])

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email:"",
            password:""
         },})

     async function onSubmit(values: z.infer<typeof loginSchema>) {
      try {
        const {data} = await axios.post("/api/auth/login",values)
        if(data.success){
          loginModal.onClose()
        }
      } catch (error:any) {
            if(error.response.data.error){
              setError(error.response.data.error)
            }else{
              setError("Somthing went wrong")
            }
      }
    }
      const {isSubmitting} = form.formState

      const bodyContent= (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-12 space-y-4">
        {error && (
         <Alert variant="destructive">
         <AlertCircle className="w-4 h-4" />
         <AlertTitle>Error</AlertTitle>
         <AlertDescription>
          {error}
         </AlertDescription>
        </Alert>
)}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password"  type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <Button
          label="Login"
          type='submit'
          secondary
          fullWidth
          large
          disabled={isSubmitting}
          />
        </form>
      </Form>



  )
  const footer = <div className='mb-4 text-center text-neutral-400'>
  <p>
    Already have an account? &nbsp;
    <span className='text-white cursor-pointer hover:underline' onClick={onToggle}>
      Create an account
    </span>
  </p>
</div>
  return(
    <Modal
    isOpen={loginModal.isOpen}
    onClose = {loginModal.onClose}
    body={bodyContent}
    footer={footer}
    />
  )
}
