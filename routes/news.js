const { Router } = require('express')

// Controller imports
const {
    getNews, getNewById,
    storeNew, updateNew,
    deleteNew
} = require('../controllers/news')

const router = Router()

// Users
router.get('/', getNews)
router.get('/:new_id', getNewById)
router.post('/', storeNew)
router.put('/:new_id', updateNew)
router.delete('/:new_id', deleteNew)

module.exports = router