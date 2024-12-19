import PriceListItem from '@/components/scraper/Scraper'
import { ProductArray, ProductData } from '@/types/types'
import getURLData from "@/utils/scraper"
import { Suspense } from 'react'
import Loading from './loading'

export default async function Scraper() {

  const productsArray = [
    'https://www.amazon.ae/Powerology-Station-10000mAh-Wireless-Power/dp/B09X6YBYXD/ref=sr_1_1?crid=3RGEED5ZUWA68&dib=eyJ2IjoiMSJ9.KByVK8Ft_LQUOUOVn9vxfizOX1TvpLaV-SeX-ZihgKzAAF1P3rlmB7_3fqN7xaeRN0DHyTRCGeNi9xe-nf5qVv_fqGwktUBXpkxfjmna7pIpBCvHk44z-RrbjMPsrM-pfuVOSqTdiV20Xh3fxWku6hWIMuHtUV-OZsOWU8GaJdduJ4IGAyPVnT_M-VIa1XZdIMn15GSA55gQzs8-J6reJFryR_diAnrtvsVr93eiRwLi8JFPU4XHF_8ywz9cwtO99dOED03UqoDZ_w0KcRbF4br7wKg7xt_1lOg2HW5x_MRXX9rfAUz4-dmFFcVGL4wMie-Em4Ibjz0n1uVu8PR81L2qTnF0ByFvKi4uqLcxdQTRwAzCmybFCJ1-fEcBEGkvgwZrpSgjQPM0YumyfBWnMUZhWW4GvLwzjSKvmaWNqsGkSHoli06lMV2EEebO7_lR.XrSrP1tRP3QHt2NXjtHizvM2gVJK-V4mN6u60eOIYgw&dib_tag=se&keywords=powerology&qid=1734446965&sprefix=powerology%2Caps%2C193&sr=8-1&th=1',
    'https://www.amazon.ae/Porodo-USB-C-Multi-Port-Super-3000W/dp/B0C1C3YVWZ/ref=sr_1_7?crid=FY2VUP0SM9KL&dib=eyJ2IjoiMSJ9.peWF6JI4Ge9WY5a1s6iZVuxDGATHURmfjBqVx6t5IZtiSbKyy7STXspCmlyT3T2AirEDqRXZxXJropvg_8PO9zou2EQKkKBlIEPcVmicFvyQP5vSRD5fX6bPwypRm0LT2sdAAvjrhkP-Q-9Kghkh8IxgJyUqYc5KmDVjYL81GA8zcc5prZSAqHujjxZ6vgxGsj1eaanDie4yMcdlvuGoaRWYCoQXJzK1aeWBVR2c76R7SPND7xhr4gqFQxqGE_WFDv1C9N0Myfba9r8fL3eZaQaKjFvoUCIMdu6fmCliZT49NsV15TUDlWYsbE8S4guekmyJlmW-cUph-aIlvnfX8e3aRs7pMLfDE0JEFJ-Kzt8GoV5DWZf51p3LnwIoTeidA-otAQKOIrve1dVvyzVvtO9vlbgWM5uWz30-l1ejNd6oz7hlnblSzOnR6yqSQh9e.WNDZFA4c-AaDJNgfNcOBVr3q24ivx3cHzJPULmK_2k0&dib_tag=se&keywords=porodo&qid=1734526834&sprefix=porodo%2Caps%2C227&sr=8-7',
    'https://www.amazon.ae/ikeoat-Electronic-Accessories-Organizer-Compatible/dp/B0BJDSYBXR/ref=sr_1_5?crid=2JMVKSSV0Z5U3&dib=eyJ2IjoiMSJ9._26sOLdA1ky8mNG9ZLKRLo9xEnMrUnkpf48oCKSHDwIxxl561j_yzF9R3dtgNvqSH505GfEm5HJAFKt8ATB2SNfa0UutktAd_hWIIfJ0sPXKrKU-CP3IDrUHBY-YCmp3R9RaQMBzU_66C0rlXGcA5kbAJu5bqHov2ZSgCN6xoUQjZnmN5WpqNIgdsO8snAebxEuUIW-DjKvXC2etls5PH88APFOx5j4a-ehGMyQm3qg3nG6lqUhvroUjFeS5LqJsapnVc55VuDmW0GMAseLeSwLXoZ2mcSdsupro2Dj9oSUp7ivgGgz8sZcmfsCtObsjhgy9kx_p9VQN-tF4kKWxqR2kMmSf3-8jdJS43SkFhUUmaIdQ-UsMTkCivYn81idWwsK5rcZ3SMjQDOpk6uTsfAG1J7fDJBjhhdRGGs1se6GlXuwImuZxRcLCWu2CGrN1.KfkQTlHD1Jb1QKHuVYp5AxbYrjdRj5iTEVAefTHU4QE&dib_tag=se&keywords=electronic&qid=1734526866&sprefix=electronic%2Caps%2C205&sr=8-5&th=1'
  ]
  let productData: ProductData | undefined
  let productsData: ProductArray | undefined = []

  for (let i = 0; i < productsArray.length; i++) {
    productData = await getURLData(productsArray[i])
    productsData.push(productData!)
  }

  return (
    <>
      <h1 className='text-5xl font-normal tracking-wider text-center p-10'>AMAZONE PRICE LIST PROJECT</h1>
      <div className='w-full p-10 pt-9'>
        <Suspense fallback={<Loading />}>
          <table className='my-0 mx-auto'>
            <thead>
              <tr>
                <th className='table-col'>Image</th>
                <th className='table-col'>Title</th>
                <th className='table-col'>SKU</th>
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
