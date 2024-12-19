const mongoose = require('mongoose')

const connectToDB = async () => {
try {
    if (mongoose.connections[0].readyState) {
        return
    } else {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('CONNECT TO DB SECCESSFULLY 👍')
    }
} catch (error) {
    console.log('CAN NOT CONNECT TO DATABASE 😭', error)
}
}

export default connectToDB