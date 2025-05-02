import { Trash2, Plus, Minus } from 'lucide-react';

let INRupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
});

export default function CartCard({
    id,
    brand,
    name,
    price,
    image,
    quantity,
    userId,
    userEmail
}: {
    id: string;
    brand: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    userId: string
    userEmail: string
}) {

    // Function to handle increase quantity
    const handleIncrease = async () => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, action: 'increase', userId: userId, userEmail: userEmail }),
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            // Update UI directly (no reload)
            const updatedCart = await response.json();
            // Assuming you have a state or method to update the UI with new cart data
            console.log(updatedCart);  // Here you can update your UI or cart state
        } catch (error) {
            console.error('Failed to increase quantity:', error);
        }
    };

    // Function to handle decrease quantity
    const handleDecrease = async () => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, action: 'decrease', userId: 'user123', userEmail: 'user@example.com' }),
            });
            if (!response.ok) throw new Error('Failed to update quantity');
            // Update UI directly (no reload)
            const updatedCart = await response.json();
            console.log(updatedCart);
        } catch (error) {
            console.error('Failed to decrease quantity:', error);
        }
    };

    // Function to handle remove item from cart
    const handleRemove = async () => {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itemId: id, action: 'remove', userId: 'user123', userEmail: 'user@example.com' }),
            });
            if (!response.ok) throw new Error('Failed to remove item');
            // Update UI directly (no reload)
            const updatedCart = await response.json();
            console.log(updatedCart);
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    return (
        <div className="md:flex md:gap-4 space-y-4 p-4 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
        dark:border-[#404258] w-full rounded-[20px]">

            <div className='w-full md:w-1/3'>
            <img src={image} alt={name} className='object-cover' />
            </div>

            <div className='w-full space-y-4'>
            <div className='flex justify-between'>
                <div>
                    <div className="text-sm text-gray-500">{brand}</div>
                    <div className="text-lg font-medium">{name}</div>
                </div>
                <div className='flex gap-3'>
                    <div className="text-sm text-gray-500">Quantity</div>
                    <div className="text-4xl font-normal">{quantity}</div>
                </div>
            </div>

            <div className="flex gap-2 items-end">
                <p className="text-2xl font-medium">{INRupee.format(price)}</p>
            </div>

            <div className='flex justify-between gap-4'>
                <div className='flex w-full gap-4'>
                    <button 
                        onClick={handleRemove}
                        className='border border-[#D8D9CF] dark:border-[#404258] rounded-[20px] px-4 py-1.5 cursor-pointer items-center text-[#030303]'
                    >
                        <Trash2 size={16} strokeWidth={1.5} className='text-[#F2613F]' />
                    </button>

                    <div className='w-full border border-[#D8D9CF] dark:border-[#404258] rounded-[20px] flex'>
                        <button 
                            onClick={handleDecrease} 
                            className='w-1/2 rounded-l-[20px] cursor-pointer'
                        >
                            <Minus size={16} className='mx-auto' />
                        </button>

                        <button 
                            onClick={handleIncrease}
                            className='w-1/2 rounded-r-[20px] border-l border-[#D8D9CF] dark:border-[#404258] cursor-pointer'
                        >
                            <Plus size={16} className='mx-auto' />
                        </button>
                    </div>
                </div>

                <button 
                    className='w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px] cursor-pointer items-center gap-3 text-[#030303]'
                >
                    Buy
                </button>
            </div>
            </div>
        </div>
    );
}