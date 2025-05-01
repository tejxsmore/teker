'use client'

import { MoreVertical, Check } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import DeleteAddress from './DeleteAddress.tsx'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'

export default function AddressActions({
  id,
  isPrimary
}: {
  id: string
  isPrimary: boolean
}) {
  const [loading, setLoading] = useState(false)

  const handleSetPrimary = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/address/set-primary', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()
      if (res.ok) {
        toast.success('Set as primary ✅')
        setTimeout(() => window.location.reload(), 500)
      } else {
        toast.error(data?.error || 'Failed to update')
      }
    } catch (err) {
      console.error(err)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="focus:outline-none focus:ring-0 active:outline-none active:ring-0 
          data-[state=open]:outline-none"
        >
          <MoreVertical size={16} className="cursor-pointer" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#F7F7F7] dark:bg-[#1f1f23] dark:text-white 
        border-0 rounded-[16px] tracking-wide p-2 border border-[#D8D9CF] 
        dark:border-[#404258]"
      >
        {!isPrimary && (
          <DropdownMenuItem
            onClick={handleSetPrimary}
            disabled={loading}
            className="cursor-pointer px-3 py-2 flex items-center gap-2 
            dark:hover:bg-[#1f1f23] dark:hover:text-white"
          >
            {loading ? (
              'Updating...'
            ) : (
              <>
                <Check size={16} className="text-[#1DCD9F]" />
                Set as Primary
              </>
            )}
          </DropdownMenuItem>
        )}
        
        <DeleteAddress id={String(id)} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}