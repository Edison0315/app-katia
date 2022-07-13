const { Router } = require('express')

// Controllers
const { 
    getFiles, getFilesById,
    storeFile, deleteFile 
} = require('../controllers/files')

// Routas
const router = Router()

router.get('/', getFiles)
router.get('/:file_id', getFilesById)
router.post('/', storeFile)
router.delete('/:file_id', deleteFile)

module.exports = router