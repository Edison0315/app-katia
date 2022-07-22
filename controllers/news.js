const { request, response } = require("express")
const { mongoose }          = require("mongoose")

const New = require('../models/ODM/New')

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
const getNews = async(req = request, res = response) => {
    try {
        
        const news = await New.find({status: true})

        return res.status(200).json({
            news
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
const getNewById = async(req = request, res = response) => {
    try {
        
        const { new_id } = req.params

        const news = await New.findById({_id: new_id})

        return res.status(200).json({
            news
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
const storeNew = async(req = request, res = response) => {
    try {
        
        const {
            type, level, date,
            time, comments, icon, patient_id,
            created_at, updated_at
        } = req.body

        // Create instance model 
        const $new = new New({
            type, level, date,
            time, comments, icon, patient_id,
            created_at, updated_at
        })
        // Store in mongo
        await $new.save()

        return res.status(201).json({
            message: "New created sucessfully",
            new: $new
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
const updateNew = async(req = request, res = response) => {
    try {
        
        const new_id = mongoose.Types.ObjectId(req.params.new_id.trim())

        const $new = req.body

        /**
         * 
         * @param Object<Mongoose> user_id
         * @param Object object
         * @param Object object
         * @returns JSON json
         */  
        await New.findByIdAndUpdate(
            new_id,
            $new,
            { returnDocument: 'after' }
        )

        return res.status(200).json({
            message: "New updated sucessfully",
            new: $new
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
const deleteNew = async(req = request, res = response) => {
    try {
        
        const { new_id } = req.params

        await New.findByIdAndDelete(new_id)
        
        return res.status(200).json({
            message: "User deleted sucessfully"
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getNews,
    getNewById,
    storeNew,
    updateNew,
    deleteNew
}