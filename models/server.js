const express          = require('express')
const { DBconnection } = require('../database/connection')
const fileUpload       = require('express-fileupload')


class Server {

    constructor(){

        this.app  = express()
        this.port = process.env.KATIA_PORT

        // Paths obj
        this.paths = {
            users: '/api/users',
            news: '/api/news',
            files: '/api/files'
        }

        // DB connection
        this.dbConnection()
        
        // Middlewares
        this.middlewares()
        
        // Rutas
        this.routes()

    }

    async dbConnection(){
        await DBconnection()
    }

    middlewares(){
        // JSON parse
        this.app.use(express.json())

        // Upload files
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use(this.paths.users, require('../routes/users'))
        this.app.use(this.paths.news, require('../routes/news'))
        this.app.use(this.paths.files, require('../routes/files'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`This app is running in ${this.port} port`)
        })
    }

}

module.exports = Server