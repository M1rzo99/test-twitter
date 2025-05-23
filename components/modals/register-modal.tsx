'use client'
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import Modal from '../ui/modal'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { regStep1Schema, regStep2Schema } from '@/lib/validation'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Button from '../ui/button'
import useLoginModal from '@/hooks/useLoginModal'
import axios from "axios"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function RegisterModal() {
    const [step,setStep] = useState(1)
    const [data,setData] = useState({name:"", email:""})

    const loginModal = useLoginModal()
    const registerModal = useRegisterModal()

    const onToggle = useCallback(()=>{
      registerModal.onClose();
        loginModal.onOpen()
    },[loginModal,registerModal])

    const bodyContent = step === 1 ? <RegisterStep1 setData={setData} setStep={setStep}/> : <RegisterStep2 data={data}/>

    const footer = <div className='mb-4 text-center text-neutral-400'>
      <p>
        Already have an account? &nbsp;
        <span className='text-white cursor-pointer hover:underline' onClick={onToggle}>
          Sign in
        </span>
      </p>
    </div>

    return(
        <Modal
        body={bodyContent}
        footer={footer}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        step={step}
        totalSteps={2}
        /> )}

  // Register 1 modal
function RegisterStep1 (
  {setData,setStep}:
  {setData:Dispatch<SetStateAction<{name:string;email:string}>>;
  setStep:Dispatch<SetStateAction<number>>
}) {
  const [error,setError]  = useState("")

    const form = useForm<z.infer<typeof regStep1Schema>>({
        resolver: zodResolver(regStep1Schema),
        defaultValues: {
            email:"",
            name:""
         },})


     async function onSubmit(values: z.infer<typeof regStep1Schema>) {
        try {
          const {data} = await axios.post("/api/auth/register?step=1",values)
          if(data.success){
            setData(values)
            setStep(2)
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

 return(
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
        <h3 className='font-semibold text-white tetx-3xl'>Create an account</h3>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button
        label="Next"
        type='submit'
        secondary
        fullWidth
        large
        disabled={isSubmitting}
        />
      </form>
    </Form>)
}

// Register 2 modal
function RegisterStep2 ({data}: {data:{name:string,email:string}}) {
  const [error,setError] = useState( '' )
  const RegisterModal = useRegisterModal()

  const form = useForm<z.infer<typeof regStep2Schema>>({
    resolver: zodResolver(regStep2Schema),
    defaultValues: {
        password:"",
        username:""
     },})

  async function onSubmit(values: z.infer<typeof regStep2Schema>) {
try {
  const{data:response} = await axios.post("/api/auth/register?step=2",{
...data,
...values
  })
  if(response.success){
    RegisterModal.onClose()
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
    return (
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
    </Form>)

   }
