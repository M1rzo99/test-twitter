'use client'
import useRegisterModal from '@/hooks/useRegisterModal'
import React, { useState } from 'react'
import Modal from '../ui/modal'
import { X } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { regStep1Schema } from '@/lib/validation'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export default function RegisterModal() {
    const [step,setStep] = useState(1)
    const registerModal = useRegisterModal()

    const bodyContent = step === 1 ? <RegisterStep1/> : <RegisterStep2/>

    const footer = <div>Footer Content</div>

    return(
        <Modal
        body={bodyContent}
        footer={footer}
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        step={step}
        totalSteps={2}
        /> )}

function RegisterStep1 () {
    const form = useForm<z.infer<typeof regStep1Schema>>({
        resolver: zodResolver(regStep1Schema),
        defaultValues: {
            email:"",
            name:""
         },})

      function onSubmit(values: z.infer<typeof regStep1Schema>) {
      }

      const {isSubmitting} = form.formState

 return(
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
      </form>
    </Form>)
}

function RegisterStep2 () {
    return <div>Register step2  </div>
   }
