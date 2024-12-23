const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
    title: {
        type: String,
        require: true,
        unique: true
    },
    url: {
        type: String,
        require: true,
        unique: true
    },
    asin: {
        type: String,
        require: true,
        unique: true
    },
    date:{
        type: Date,
        default: () => new Date(),
    },
},
{ timestamps: true }
)

const model = mongoose.models.ProductURL || mongoose.model('ProductURL', schema)
export default model