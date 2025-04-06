export default function PhoneCard({name}: {name: string}){
    return <div 
    className="p-5 bg-[#F7F7F7] dark:bg-[#030303] border border-[#D8D9CF] 
    dark:border-[#404258] max-w-md rounded-[20px] space-y-5">
        <h3 className="text-lg font-normal">{name}</h3>
        <div className="flex justify-between gap-5 text-sm">
            <button 
            className="w-full border border-[#D8D9CF] dark:border-[#404258] px-4 
            py-1.5 rounded-[20px] cursor-pointer items-center gap-3">
                Add to Cart
            </button>
            <button 
            className="w-full bg-[#1DCD9F] border border-[#169976] px-4 py-1.5 rounded-[20px]
            cursor-pointer items-center gap-3 text-[#030303]">
                Buy
            </button>
        </div>
    </div>
}