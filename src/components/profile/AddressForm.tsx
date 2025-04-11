'use client'

import { useEffect, useRef, useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

export default function AddressForm({ hasSavedAddress = false }: { hasSavedAddress?: boolean }) {
    const [showForm, setShowForm] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const firstInputRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
    })

    useEffect(() => {
        const updateScreenSize = () => setIsLargeScreen(window.innerWidth >= 768)
        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        return () => window.removeEventListener('resize', updateScreenSize)
    }, [])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowForm(false)
        }
        if (showForm) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [showForm])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(e.target as Node)) {
                setShowForm(false)
            }
        }
        if (showForm && isLargeScreen) {
            window.addEventListener('mousedown', handleClickOutside)
            return () => window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showForm, isLargeScreen])

    useEffect(() => {
        if (showForm && firstInputRef.current) {
            firstInputRef.current.focus()
        }
    }, [showForm])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!/^\d{6}$/.test(formData.pincode)) {
            toast.error('Pincode must be exactly 6 digits.')
            return
        }

        try {
            const res = await fetch('/api/address/add-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (res.ok) {
                toast.success('Address saved successfully 🚀')
                setTimeout(() => window.location.reload(), 1000)
            } else {
                const error = await res.json()
                toast.error(error?.message || 'Something went wrong')
            }

            setShowForm(false)
        } catch (error) {
            toast.error('Network error')
            console.error(error)
        }
    }

    const fields = [
        { label: 'Title', name: 'title', placeholder: 'Home / Office / Friend', required: false },
        { label: 'Flat, wing, building name', name: 'line1', placeholder: '101, B wing, Shashwat Park', required: true },
        { label: 'Area, landmark', name: 'line2', placeholder: 'Gandhi Nagar, Near DLF Mall', required: true },
        { label: 'City', name: 'city', placeholder: 'Mumbai', required: true },
        { label: 'State', name: 'state', placeholder: 'Maharashtra', required: true },
        { label: 'Pincode', name: 'pincode', placeholder: '400001', type: 'text', maxLength: 6, required: true },
    ]

    const formContent = (
        <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='space-y-5 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] 
                       border border-[#D8D9CF] dark:border-[#404258] w-full md:max-w-md'
        >
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-normal">Enter Address</h2>
                <button type="button" onClick={() => setShowForm(false)}>
                    <X size={24} className='cursor-pointer hover:text-[#F2613F]' />
                </button>
            </div>

            {fields.map(({ label, name, placeholder, type = 'text', maxLength, required }, i) => (
                <div key={name}>
                    <p className='text-sm text-gray-500'>{label}</p>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        required={required}
                        onChange={handleInputChange}
                        ref={i === 0 ? firstInputRef : null}
                        className="w-full pb-5 focus:outline-none text-lg font-normal
                                   border-b-2 border-dashed border-[#D8D9CF] dark:border-[#404258]"
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 
                           rounded-[20px] text-[#030303] cursor-pointer"
            >
                Save Address
            </button>
        </motion.form>
    )

    return (
        <>
            {!showForm && (
                <div
                    onClick={() => setShowForm(true)}
                    className={`
                        w-full
                        ${isLargeScreen ? (hasSavedAddress ? 'md:w-full' : 'md:w-1/2') : ''}
                        h-full cursor-pointer p-5 rounded-[20px] bg-[#F7F7F7] 
                        dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258] 
                        flex justify-between items-center
                    `}
                >
                    <p className='text-lg font-normal'>Add address</p>
                    <CirclePlus size={20} strokeWidth={1.5} className='hover:text-[#1DCD9F]' />
                </div>
            )}

            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center 
                        justify-center bg-black/30 backdrop-blur-sm px-4'
                    >
                        {formContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}