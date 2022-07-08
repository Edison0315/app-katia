const { response, request} = require('express')

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
const getUsers = async(req = request, res = response) => {
    try {
        
        return res.send('Todos los usuarios')

    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
 const getUserById = async(req = request, res = response) => {
    try {
        
        return res.send(`Dentro del controlador getUserById ${req.params.user_id}`)

    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */

 const storeUser = async(req = request, res = response) => {
    try {

        return res.status(201).json({
            body: req.body
        })

    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */

 const updateUser = async(req = request, res = response) => {
    try {
        
        return res.send(`Actualizando el usuario ${req.params.user_id}`)

    } catch (error) {
        console.log(error)
    }
}

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */

 const deletUser = async(req = request, res = response) => {
    try {
        
        return res.send(`Eliminando el usuario ${req.params.user_id}`)

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    storeUser,
    updateUser,
    deletUser
}