'use client'

import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useState } from 'react'

import {
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function DeleteAddress({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    toast.loading('Deleting address...')

    try {
      const res = await fetch('/api/address/delete-address', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.dismiss() // remove loading toast
        toast.success('Address deleted successfully ✅')
        setTimeout(() => window.location.reload(), 1000)
      } else {
        toast.dismiss()
        toast.error(data?.error || 'Something went wrong ❌')
      }
    } catch (err) {
      toast.dismiss()
      toast.error('Something went wrong ❌')
      console.error(err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleDelete}
      className="cursor-pointer px-3 py-2 flex items-center gap-2 
      dark:hover:bg-[#1f1f23] dark:hover:text-white"
      disabled={isDeleting}
    >
      {isDeleting ? (
        'Deleting...'
      ) : (
        <>
          <Trash2 size={16} className="text-[#F2613F]" />
          Delete Address
        </>
      )}
    </DropdownMenuItem>
  )
}