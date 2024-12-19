'use client'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'

type Props = {}

function AddProductForm({ }: Props) {
    const [productTitle, setProductTitle] = useState('')
    const [productURL, setProductURL] = useState('')
    const [productAsin, setProductAsin] = useState('')

    const submitFormHandler = async (event: FormEvent) => {
        event?.preventDefault()
        await axios.post('./../api/amazonProduct',
            {
                title: productTitle,
                url: productURL,
                asin: productAsin
            }
        ) .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-svh gap-10">
            <h2 className='text-2xl tracking-wider font-normal'>Add New Product For Track ➕</h2>
            <form onSubmit={submitFormHandler} className='flex flex-col justify-center items-center gap-5'>
                <label htmlFor="productTitle" className='flex flex-col gap-2 font-normal tracking-wider'>Title
                    <input className='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]' type="text" name="productTitle" id="productTitle" value={productTitle} onChange={(event) => setProductTitle(event.target.value)} />
                </label>
                <label htmlFor="productURL" className='flex flex-col gap-2 font-normal tracking-wider'><span>URL<span className='text-red-600'>*</span></span>
                    <input className='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]' type="text" name="productURL" id="productURL" value={productURL} onChange={(event) => setProductURL(event.target.value)} />
                </label>
                <label htmlFor="productAsin" className='flex flex-col gap-2 font-normal tracking-wider'>Asin
                    <input className='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]' type="text" name="productAsin" id="productAsin" value={productAsin} onChange={(event) => setProductAsin(event.target.value)} />
                </label>
                <button className='w-full h-12 bg-green-700 text-white text-2xl font-normal rounded-lg hover:bg-green-500' type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProductForm