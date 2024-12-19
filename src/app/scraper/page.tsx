import PriceListItem from '@/components/scraper/Scraper'
import { ProductData } from '@/types/types'
import getURLData from "@/utils/getURLData"
import { Suspense } from 'react'
import Loading from './loading'
import axios from 'axios'
import ProductModel from "@/models/ProductModel"
import connectToDB from '@/configs/db'


export default async function Scraper() {

  connectToDB()

  const productsURLArray = await ProductModel.find({}, 'url -_id')

  let productsData: ProductData[] = []

  await axios.all(productsURLArray.map(async (urlObj: {url:string}) => await getURLData(urlObj.url))).then(
    (dataArray: any[]) => productsData = dataArray
  )

  return (
    <>
      <h1 className='text-5xl font-normal tracking-wider text-center p-10'>AMAZON PRICE LIST PROJECT</h1>
      <div className='w-full p-10 pt-9'>
        <Suspense fallback={<Loading />}>
          <table className='my-0 mx-auto'>
            <thead>
              <tr>
                <th className='table-col'>Image</th>
                <th className='table-col'>Title</th>
                <th className='table-col'>ASIN</th>
                <th className='table-col'>Seller</th>
                <th className='table-col'>Price</th>
                <th className='table-col'>Stock</th>
              </tr>
            </thead>
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
    </>
  )
}
