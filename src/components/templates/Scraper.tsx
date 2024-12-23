'use client'
import { ProductData } from '@/types/types'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PriceListItem = ({ imageUrl, title, sku, price, seller, stock }: ProductData) => {
    const router = useRouter()
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            router.refresh()
        }, 60000)

        return () => clearInterval(refreshInterval)
    }, [])

    return (
        <tr>
            <td className='table-col'>
                <img src={imageUrl} alt="" className='w-60 h-40' />
            </td>
            <td className='table-col'>{title?.trim()}</td>
            <td className='table-col'>{sku}</td>
            {
                seller?.trim().toLowerCase() === 'runbazaar' ?
                    (<td className='table-col font-bold bg-green-700 text-white'>{seller}</td>) :
                    (<td className='table-col font-bold bg-red-700 text-white'>{seller}</td>)
            }
            <td className='table-col space-x-3'>
                <span className='text-green-500'>{price}</span>
                <span>AED</span>
            </td>
            {
                stock?.trim().toLowerCase() === 'in stock' || stock?.trim().toLowerCase().includes('only')?
                    (<td className='table-col font-bold bg-green-700 text-white'>{stock}</td>) :
                    (<td className='table-col font-bold bg-red-700 text-white'>{stock}</td>)
            }

        </tr>
    )
}

export default PriceListItem