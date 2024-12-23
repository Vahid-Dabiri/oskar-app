import connectToDB from "@/configs/db"
import ProductModel from "@/models/ProductModel"

type requestType = Request

export async function POST(req: requestType) {

    try {
        connectToDB()
        const body = await req.json();
        const { newTitle, newUrl, newAsin } = body

        console.log(newTitle)

        // Validation

        // Validate Title
        if (!newTitle.trim()) {
            return Response.json(
                { message: 'Invalid Title' },
                { status: 400 }
            )
        } else {
            const productTitle = await ProductModel.findOne({ title: newTitle })
            if (productTitle) {
                return Response.json(
                    { message: 'This Tilte already exist' },
                    { status: 403 }
                )
            }
        }

        // Validate URL
        const isValidURL = (newURL: string) => {
            try {
                new URL(newURL)
                return true
            } catch (error) {
                return false
            }
        }

        if (!isValidURL(newUrl)) {
            return Response.json(
                { message: "invalid URL" },
                { status: 400 }
            )
        } else {
            const productURL = await ProductModel.findOne({ url: newUrl })
            if (productURL) {
                return Response.json(
                    { message: 'This URL already exist' },
                    { status: 403 }
                )
            }
        }

        // Validate ASIN
        if (newAsin.trim().length < 10 || newAsin.trim().length > 10) {
            return Response.json(
                { message: 'Invalid ASIN' },
                { status: 400 }
            )
        } else {
            const productASIN = await ProductModel.findOne({ asin: newAsin })
            if (productASIN) {
                return Response.json(
                    { message: 'This ASIN already exist' },
                    { status: 403 }
                )
            }
        }

        const product = await ProductModel.create({ title: newTitle, url: newUrl, asin: newAsin })
        return Response.json(
            { message: "Product Save Successfully 👍", data: product },
            { status: 200 }
        );
    } catch (error) {
        return Response.json(
            { message: `ERROR IN CREATING PRODUCT ->  ${error}` },
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
            { message: `ERROR IN GETING PRODUCTS ->  ${error}` },
            { status: 500 }
        )
    }
}