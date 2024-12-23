'use client'
import TextInput from '@/components/templates/TextInput'
import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function AddProductForm() {
    const [productTitle, setProductTitle] = useState('')
    const [productURL, setProductURL] = useState('')
    const [productAsin, setProductAsin] = useState('')

    const submitFormHandler = async (event: FormEvent) => {
        event?.preventDefault()

        // Validation

        // Validate ASIN
        if (!productTitle.trim()) {
            toast.error('Invalid Title', {
                icon: '⛔',
                style: {
                    fontSize: '20px',
                }
            })
            return
        }

        // Validation URL
        const isValidURL = (newURL: string) => {
            try {
                new URL(newURL)
                return true
            } catch (error) {
                return false
            }
        }

        if (!isValidURL(productURL)) {
            toast.error('Invalid URL', {
                icon: '⛔',
                style: {
                    fontSize: '20px'
                }
            })
            return
        }

        // Validate ASIN
        if (productAsin.trim()) {
            if (productAsin.trim().length < 10 || productAsin.trim().length > 10) {
                toast.error('Invalid ASIN. Must be 10 charachter', {
                    icon: '⛔',
                    style: {
                        fontSize: '20px',
                    }
                })
                return
            }
        }

        // Create and save in DB
        await axios.post('./../api/amazonProduct',
            {
                newTitle: productTitle,
                newUrl: productURL,
                newAsin: productAsin
            }
        ).then(function (response) {
            setProductTitle('')
            setProductURL('')
            setProductAsin('')
            // console.log(response)
            if (response.status === 200) {
                toast.success(response.data.message, {
                    icon: '👍',
                    style: {
                        fontSize: '20px'
                    }
                })
            }
        })
            .catch(function (error) {
                // console.log(error)
                toast.success(error.response.data.message, {
                    icon: '⛔',
                    style: {
                        fontSize: '20px'
                    }
                })
            });
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-svh gap-10">
            <Toaster />
            <h2 className='text-2xl tracking-wider font-normal'>Add New Product For Track ➕</h2>
            <form onSubmit={submitFormHandler} className='flex flex-col justify-center items-center gap-5'>
                <TextInput
                    inputId='productTitle'
                    lableStyle='flex flex-col gap-2 font-normal tracking-wider'
                    inputStyle='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]'
                    inputTitle='Title'
                    value={productTitle}
                    onChangeState={setProductTitle}
                />
                <TextInput
                    inputId='productURL'
                    lableStyle='flex flex-col gap-2 font-normal tracking-wider'
                    inputStyle='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]'
                    inputTitle='URL'
                    value={productURL}
                    onChangeState={setProductURL}
                />
                <TextInput
                    inputId='productAsin'
                    lableStyle='flex flex-col gap-2 font-normal tracking-wider'
                    inputStyle='p-3 text-black text-2xl rounded-lg outline-blue-300 w-[40rem]'
                    inputTitle='ASIN'
                    value={productAsin}
                    onChangeState={setProductAsin}
                />
                
                <button className='w-full h-12 bg-green-700 text-white text-2xl font-normal rounded-lg hover:bg-green-500' type="submit">Add Product</button>
            </form>
        </div>
    )
}

export default AddProductForm