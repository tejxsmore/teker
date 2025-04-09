'use client'

import { useEffect, useState } from 'react'
import { CirclePlus, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AddressForm() {
    const [showForm, setShowForm] = useState(false)
    const [isLargeScreen, setIsLargeScreen] = useState(false)
    const [formData, setFormData] = useState({
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
    })

    useEffect(() => {
        const checkScreenSize = () => {
            setIsLargeScreen(window.innerWidth >= 768)
        }
        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setShowForm(false)
        }
        if (showForm) window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [showForm])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!/^\d{6}$/.test(formData.pincode)) {
            alert("Pincode must be exactly 6 digits.")
            return
        }

        console.log("🚚 Address Submitted:", formData)

        try {
            const res = await fetch('/api/address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (!res.ok) {
                throw new Error('Failed to save address')
            }

            alert('Address saved successfully ✅')
            setShowForm(false)
        } catch (error) {
            console.error(error)
            alert('Failed to save address ❌')
        }
    }

    const formContent = (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className='space-y-5 p-5 rounded-[20px] bg-[#F7F7F7] dark:bg-[#1f1f23] 
            border border-[#D8D9CF] dark:border-[#404258] w-full md:max-w-md'
        >
            <div className="flex justify-between items-center pb-5 border-b-2 border-dashed border-[#D8D9CF] dark:border-[#404258]">
                <h2 className="text-lg font-normal">Enter Address</h2>
                <button type="button" onClick={() => setShowForm(false)}>
                    <X size={28} className='text-[#030303]' />
                </button>
            </div>

            {[
                { label: 'Flat, wing, building name', name: 'line1', placeholder: '101, B wing, Shashwat Park' },
                { label: 'Area, landmark', name: 'line2', placeholder: 'Gandhi Nagar, Near DLF Mall' },
                { label: 'City', name: 'city', placeholder: 'Mumbai' },
                { label: 'State', name: 'state', placeholder: 'Maharashtra' },
                { label: 'Pincode', name: 'pincode', placeholder: '400001', type: 'text', maxLength: 6 },
            ].map(({ label, name, placeholder, type = 'text', maxLength }) => (
                <div key={name}>
                    <p className='text-sm text-gray-500'>{label}</p>
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onChange={handleInputChange}
                        className="w-full pb-5 focus:outline-none text-lg font-normal
                        border-b-2 border-dashed border-[#D8D9CF] dark:border-[#404258]"
                    />
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
                cursor-pointer items-center gap-3 text-[#030303]"
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
                    className='cursor-pointer p-5 rounded-[20px] bg-[#F7F7F7] 
                    dark:bg-[#1f1f23] border border-[#D8D9CF] dark:border-[#404258] 
                    flex justify-between items-center'
                >
                    <p className='text-lg font-normal'>Add address</p>
                    <span><CirclePlus size={20} /></span>
                </div>
            )}

            <AnimatePresence>
                {showForm && isLargeScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4"
                    >
                        {formContent}
                    </motion.div>
                )}

                {showForm && !isLargeScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {formContent}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}