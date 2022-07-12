const { response, request} = require('express')
const { mongoose }         = require('mongoose')

const User = require('../models/ODM/User')

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
const getUsers = async(req = request, res = response) => {
    try {
        
        const users = await User.find({status: true})

        return res.status(200).json({
            users
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
 const getUserById = async(req = request, res = response) => {
    try {
        
        const { user_id } = req.params

        const user = await User.findById({_id: user_id})

        return res.status(200).json({
            user
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

 const storeUser = async(req = request, res = response) => {
    try {

        const { 
            name, last_name, email, password, 
            gender, phone, birthdate, patient_id,
            created_at, updated_at
        } = req.body

        // Create instance model 
        const user = new User({
            name, last_name, email, password, 
            gender, phone, birthdate, patient_id,
            created_at, updated_at
        })

        // Store in mongo DB
        await user.save()

        return res.status(201).json({
            message: "User created sucessfully",
            user
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
        
        const user_id = mongoose.Types.ObjectId(req.params.user_id.trim())

        const { 
            password, ...user_rest
        } = req.body

        /**
         * 
         * @param Object<Mongoose> user_id
         * @param Object object
         * @param Object object
         * @returns JSON json
         */  
        const user = await User.findByIdAndUpdate(
            user_id, 
            user_rest, 
            { returnDocument: 'after' }
        )

        return res.status(200).json({
            message: "User updated sucessfully",
            user
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

 const deletUser = async(req = request, res = response) => {
    try {

        const { user_id } = req.params

        await User.findByIdAndDelete(user_id)
        
        return res.status(200).json({
            message: "User deleted sucessfully"
        })

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