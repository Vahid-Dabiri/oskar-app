const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        require: true,
        unique: true
    },
    asin: {
        type: String,
        unique: true
    }
})

const model = mongoose.models.ProductURL || mongoose.model('ProductURL', schema)
export default model