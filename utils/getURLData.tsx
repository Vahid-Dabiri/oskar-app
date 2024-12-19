import axios from "axios"
import * as cheerio from "cheerio"
import {ProductData} from '@/types/types'

export default async function getURLData(url:string) {
    let productInfos: ProductData = {
        seller: '',
        price: '',
        title: '',
        sku: '',
        imageUrl: '',
        stock: ''
    }
    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const $ = cheerio.load(response.data)
        const buyBoxContainer = $('#desktop_buybox')
        buyBoxContainer.each(function () {
            productInfos.seller = $(this).find('#sellerProfileTriggerId').html()
            productInfos.price = $(this).find('#corePrice_feature_div > div > div > span.a-price.aok-align-center > span.a-offscreen').html()!.replace('AED', '')
            productInfos.title = $('#productTitle').html()
            productInfos.sku = url.split('/')[5]
            productInfos.imageUrl = $('#landingImage').attr('src')
            productInfos.stock = $('#availability > span').html()
        })

        return productInfos
    } catch (error) {
        console.log(`Error from getURLData ==> ${error}`)
    }
}

