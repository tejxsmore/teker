import Link from "next/link"

export default function Brands(){
    return <div className="p-5">
        <div className="flex flex-col space-y-5">
            <Link href={'/brands/apple'}>Apple</Link>
            <Link href={'/brands/google'}>Google</Link>
            <Link href={'/brands/samsung'}>Samsung</Link>
            <Link href={'/brands/xiaomi'}>Xiaomi</Link>
            <Link href={'/brands/oneplus'}>Oneplus</Link>
            <Link href={'/brands/oppo'}>Oppo</Link>
            <Link href={'/brands/vivo'}>Vivo</Link>
            <Link href={'/brands/iqoo'}>Iqoo</Link>
            <Link href={'/brands/motorola'}>Motorola</Link>
        </div>
    </div>
}