import connectToDB from "@/configs/db"
import ProductModel from "@/models/ProductModel"

type requestType = Request

export async function POST(req: requestType) {
    try {
        connectToDB()
        const body = await req.json();
        const { title, url, asin } = body
        const product = await ProductModel.create({ title, url, asin })
        return Response.json(
            { message: "Product Save Successfully 👍", data: product },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { error: `ERROR IN CREATING PRODUCT ->  ${error}` },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const products = await ProductModel.find()
        return Response.json(
            { message: "Get Products Successfully 👍", data: products },
            { status: 200 }
        )
    } catch (error) {
        return Response.json(
            { error: `ERROR IN GETING PRODUCTS ->  ${error}` },
            { status: 500 }
        )
    }
}