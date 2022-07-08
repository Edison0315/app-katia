const mongoose = require('mongoose')

/**
 * @void
 */
const DBconnection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(console.log('Database connected sucessfully'))

    } catch (error) {
        console.error(error)
        throw new Error('Error initialized database connection')
    }
}

module.exports = {
    DBconnection
}