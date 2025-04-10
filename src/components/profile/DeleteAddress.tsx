'use client'
import { Trash2 } from 'lucide-react'

export default function DeleteAddress({id}: {id: string}){

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this address?')
        if (!confirmDelete) return
    
        try {
          const res = await fetch('/api/delete-address', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
          })
    
          if (res.ok) {
            console.log(`Address deleted with id : ${id}`)
            window.location.reload()
          } else {
            const error = await res.json()
            alert('Failed to delete: ' + error?.error)
          }
        } catch (err) {
          console.error(err)
          alert('Something went wrong.')
        }
      }

    return <button onClick={handleDelete} className='cursor-pointer hover:text-[#F2613F]'>
            <Trash2 size={20} strokeWidth={1.5} />
        </button>
}