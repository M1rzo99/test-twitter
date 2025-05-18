import useLoginModal from '@/hooks/useLoginModal'
import React, { useCallback } from 'react'
import Modal from '../ui/modal'
import { loginSchema } from '@/lib/validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import Button from '../ui/button'
import useRegisterModal from '@/hooks/useRegisterModal'

export default function LoginModal() {
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

      function onSubmit(values: z.infer<typeof loginSchema>) {
       console.log(values);

      }
      const {isSubmitting} = form.formState
  const bodyContent= (

        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-12 space-y-4">
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
          label="Register"
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
