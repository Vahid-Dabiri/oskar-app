import Link from 'next/link'
import React from 'react'

type Props = {}

function Header({ }: Props) {
    return (
        <header className="px-10 py-5 fixed top-0 w-full bg-white">
            <Link href='/' className='text-black font-bold text-lg p-10'>Home</Link>
            <Link href='/track-list' className="text-black font-bold text-lg p-10">Amazon Price Project</Link>
            <Link href='/add-product' className="text-black font-bold text-lg p-10">Add Product</Link>
        </header>
    )
}

export default Header