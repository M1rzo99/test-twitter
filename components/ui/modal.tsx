import React, { ReactElement } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

interface ModalProps{
    isOpen?: boolean;
    onClose?:()=> void;
    title?: string;
    body?:ReactElement;
    footer?: ReactElement;
    step?:number;
    totalSteps?:number;
}

export default function Modal({body,footer,isOpen,onClose,step,title,totalSteps}:ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className='bg-black'>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className='mt-4'>{body}</div>
      {footer && <div className='mt-4'>{footer}</div>}
    </DialogContent>
  </Dialog>
  )
}
