'use client'

import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function DeleteAddress({ id }: { id: string }) {
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    const deleteToast = toast.promise(
      fetch('/api/address/delete-address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      }),
      {
        loading: 'Deleting address...',
        success: 'Address deleted successfully ✅',
        error: 'Failed to delete address ❌',
      }
    )

    try {
      const res = await deleteToast
      if (res.ok) {
        setShowConfirmModal(false)
        setTimeout(() => window.location.reload(), 1000)
      } else {
        const error = await res.json()
        toast.error(error?.error || 'Something went wrong')
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      {/* Delete Icon Button */}
      <button
        onClick={() => setShowConfirmModal(true)}
        className="cursor-pointer hover:text-[#F2613F]"
      >
        <Trash2 size={20} strokeWidth={1.5} />
      </button>

      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>

        <DialogContent className="p-5 sm:max-w-[400px] rounded-[20px] 
        bg-[#F7F7F7] dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258]">

          <DialogHeader>
            <DialogTitle className="text-center text-lg font-normal items-center">
              Delete Address?
            </DialogTitle>
          </DialogHeader>

          <div className="text-center text-muted-foreground">
            Are you sure you want to delete this address? This action cannot be undone.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 pt-2">

            <button onClick={() => setShowConfirmModal(false)}
            disabled={isDeleting}
            className="w-full sm:w-1/2 rounded-[20px] hover:bg-[#FFFFFF] 
            border border-[#D8D9CF] dark:border-[#404258] cursor-pointer px-4 py-1.5">
              Cancel
            </button>

            <button onClick={handleDelete}
            className="w-full sm:w-1/2 bg-[#F2613F] hover:bg-[#E83F25] rounded-[20px]
            cursor-pointer px-4 py-1.5"
            disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>

          </div>

        </DialogContent>
      </Dialog>
    </>
  )
}