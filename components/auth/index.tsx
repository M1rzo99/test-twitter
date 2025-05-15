'use client'
import Image from 'next/image'
import React, { useCallback } from 'react'
import Button from '../ui/button'
import { FcGoogle } from "react-icons/fc";
import { FaGithubAlt } from "react-icons/fa6";
import useRegisterModal from '@/hooks/useRegisterModal';
import RegisterModal from '../modals/register-modal';


export default function Auth() {
    const registerModal = useRegisterModal()

    const onOpenRegisterModal = useCallback(()=>{
        registerModal.onOpen()
    },[registerModal])

  return (
    <>
    <RegisterModal/>
    <div className="flex flex-col-reverse items-center justify-center min-h-screen px-6 py-12 space-y-10 md:grid md:grid-cols-2 md:space-y-0 md:gap-10 lg:px-20">
{/* Image */}
<div className="flex justify-center ">
        <Image
          src="/images/x.svg"
          alt="x"
          width={450}
          height={450}
          className="hidden justify-self-center md:block "
        />
      </div>
      {/* Text + Buttons section */}
      <div className="flex flex-col justify-center w-full space-y-10 ">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl">Happening now</h1>

        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Join today guyzz.</h2>
            <div className="flex flex-col space-y-3">
              <Button
                label={
                  <div className="flex items-center justify-center gap-2">
                    <FcGoogle />
                    Sign up with Google
                  </div>
                }
                fullWidth
                secondary
              />
              <Button
                label={
                  <div className="flex items-center justify-center gap-2">
                    <FaGithubAlt />
                    Sign up with Github
                  </div>
                }
                fullWidth
                secondary
              />
              <div className="flex items-center justify-center">
                <div className="w-1/2 h-px bg-gray-700" />
                <p className="mx-4 text-sm">or</p>
                <div className="w-1/2 h-px bg-gray-700" />
              </div>
              <Button label="Create account" fullWidth  onClick={onOpenRegisterModal}/>
              <div className='text-[10px] text-gray-400'>
                By signing up, you agree to the
                <span className='text-sky-500'> Terms of service</span> and
                <span className='text-sky-500'> Privacy Policy</span>, including
                <span className='text-sky-500'> Cookie Use</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-medium sm:text-lg">
              Already have an account?
            </h3>
            <Button label="Sign in" fullWidth outline />
          </div>
        </div>
      </div>


    </div>
    </>
  )
}
