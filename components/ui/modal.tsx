import React, { ReactElement } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { X } from 'lucide-react';

interface ModalProps{
    isOpen?: boolean;
    onClose?:()=> void;
    body?:ReactElement;
    footer?: ReactElement;
    step?:number;
    totalSteps?:number;
}

export default function Modal({body,footer,isOpen,onClose,step,totalSteps}:ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='p-1 bg-black'>
     <div className='flex items-center gap-6'>
     <button className='p-1 text-white transition border-0 hover:opacity-70 w-fit' onClick={onClose}>
            <X size={28}/>
        </button>
        {step && totalSteps && (<div className='text-xl font-bold'>Step {step} of {totalSteps} </div>)}
     </div>
     <div className='mt-4'> {body}</div>
      {footer && <div className='mt-4'>{footer}</div>}
    </DialogContent>
  </Dialog>
  )
}
