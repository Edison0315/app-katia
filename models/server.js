const express = require('express')
const { DBconnection } = require('../database/connection')

class Server {

    constructor(){

        this.app  = express()
        this.port = process.env.KATIA_PORT

        // Paths obj
        this.paths = {
            users: '/api/users'
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
    }

    routes(){
        this.app.use(this.paths.users, require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`This app is running in ${this.port} port`)
        })
    }

}

module.exports = Server