import PriceListItem from '@/components/templates/Scraper'
import { ProductData } from '@/types/types'
import getURLData from "@/utils/getURLData"
import { Suspense } from 'react'
import Loading from './loading'
import axios from 'axios'
import ProductModel from "@/models/ProductModel"
import connectToDB from '@/configs/db'
import Link from 'next/link'
import TableHeader from '@/components/templates/TableHeader'


export default async function Scraper() {

  connectToDB()

  const productsURLArray = await ProductModel.find({}, 'url date -_id')
  productsURLArray.sort((a: any, b: any) => {
    let c: any = new Date(a.date);
    let d: any = new Date(b.date);
    return d - c
  })

  let productsData: ProductData[] = []

  await axios.all(productsURLArray.map(async (urlObj: { url: string }) => await getURLData(urlObj.url))).then(
    (dataArray: any[]) => productsData = dataArray
  )

  return (
    <div className='p-10 pt-14'>
      <h1 className='text-5xl font-normal tracking-wider text-center p-10'>AMAZON PRICE LIST PROJECT</h1>
      <Link href='./add-product' className='border border-blue-400 rounded-lg px-5 py-3 hover:bg-gray-800'>Add New Product</Link>
      <div className='w-full pt-9'>
        {
          <div className='pb-14'>
            <h3 className='text-center font-medium tracking-wider text-xl pb-4 text-red-500'>Lose BuyBux Products</h3>
            <Suspense fallback={<Loading />}>
              <table className='my-0 mx-auto'>
                <TableHeader headerTitles={['Image', 'Title', 'ASIN', 'Seller', 'Price', 'Stock']} />
                <tbody>
                  {
                    productsData.map((data, index) => (
                      data.seller?.trim().toLowerCase() !== 'runbazaar' ? <PriceListItem key={index} {...data} /> : ''
                    ))
                  }
                </tbody>
              </table>
            </Suspense>
          </div>
        }
        <Suspense fallback={<Loading />}>
          <h3 className='text-center font-medium tracking-wider text-xl pb-4'>All Products</h3>
          <table className='my-0 mx-auto'>
            <TableHeader headerTitles={['Image', 'Title', 'ASIN', 'Seller', 'Price', 'Stock']} />
            <tbody>
              {
                productsData.map((data, index) => (
                  <PriceListItem key={index} {...data} />
                ))
              }
            </tbody>
          </table>
        </Suspense>
      </div>
    </div>
  )
}
