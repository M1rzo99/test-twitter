"use client"
import { useDropzone } from 'react-dropzone'
import React, { useCallback, useState } from 'react'
import { MdEdit } from 'react-icons/md';
import { IoIosCloudDownload } from 'react-icons/io';
import Image from 'next/image';

interface Props {
    coverImage:string;
    onChange:(coverImage:string)=>void
}

const CoverImageUpload = ({coverImage,onChange}:Props) => {
    const [image, setImage] = useState(coverImage)

    const handleChange = useCallback(
        (coverImage:string) => {
            onChange(coverImage)
        },[onChange]
    );

    const handleDrop = useCallback(
        (files:any)=>{
            const  file = files[0]
            const reader = new FileReader();
            reader.onload = (e:any) => {
                setImage(e.target.result)
                handleChange(e.target.result)
            }
            reader.readAsDataURL(file)
        },[handleChange]
    );

    const {getRootProps, getInputProps} = useDropzone({
        maxFiles:1,
        onDrop:handleDrop,
        accept:{
            "image/jpeg":[],
            "image/png":[]
        }
    })


  return (
    <div {...getRootProps({
        className:"text-white text-center border-none rounded-md w-full h-[200px] bg-neutral-800 cursor-pointer"
    })}>
    <input {...getInputProps()} />
    {image ?
    (
        <div className='w-full h-[200px] relative left-0 right-0'>
            <Image 
            src={image}
            fill
            alt="Upload Image"
            style={{objectFit:"cover"}}
            />
            <div className='absolute inset-0 flex justify-center items-center'>
                <MdEdit size={24} className="text-white" />
                </div>
        </div>
    ) : 
    (
        <div className='w-full flex justify-center items-center cursor-pointer flex-col gap-2'>
            <IoIosCloudDownload size={50} />
            <p>Upload a Cover Image</p>
            </div>
    )}
    </div>
  )
}

export default CoverImageUpload