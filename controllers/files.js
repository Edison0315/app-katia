const { request, response } = require("express")

const cloudinary            = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const File = require('../models/ODM/File')

/**
 * 
 * @param Request req
 * @param Response res
 * @returns JSON json
 */
const getFiles = async(req = request, res = response) => {
    try {
        
        const files = await File.find({status: true})

        return res.status(200).json({
            files
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
const getFilesById = async(req = request, res = response) => {
    try {

        const { file_id } = req.params

        const files = await File.find({_id: file_id})

        return res.status(200).json({
            files
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
const storeFile = async(req = request, res = response) => {
    try {
        
        // Files
        const { tempFilePath } = req.files.file

        const { 
            name, file_type, created_at, updated_at
        } = req.body

        const file_instance = await cloudinary.uploader.upload(tempFilePath)
                                    .then((data) => {
                                        return {
                                            name, file_type, url: data.secure_url,
                                            patient_id: 2, created_at, updated_at
                                        }
                                    })

        // Create instance model
        const file = new File(file_instance)

        // Store in mongo
        await file.save()

        return res.status(201).json({
            code: 201,
            message: "File created sucessfully",
            file
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
const deleteFile = async(req = request, res = response) => {
    try {
        
        const { file_id } = req.params

        const file = await File.find({_id: file_id})

        // Get url and extract public id
        let url_public_id = file[0].url.split('/')
        url_public_id     = url_public_id[url_public_id.length - 1 ]
        url_public_id     = url_public_id.split('.')
        url_public_id     = url_public_id[0]

        // Delete file in cloudinary
        await cloudinary.uploader.destroy(url_public_id).then(async() => {
            await File.findByIdAndDelete(file_id)
        })

        return res.status(200).json({
            code: 200,
            message: "File deleted sucessfully"
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getFiles,
    getFilesById,
    storeFile,
    deleteFile
}