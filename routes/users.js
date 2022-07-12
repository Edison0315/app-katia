const { Router } = require('express')

// Controller imports
const { 
    getUsers, getUserById, storeUser, 
    updateUser, deletUser 
} = require('../controllers/users')

// Router
const router = Router()

// Users
router.get('/', getUsers)
router.get('/:user_id', getUserById)
router.post('/', storeUser)
router.put('/:user_id', updateUser)
router.delete('/:user_id', deletUser)

module.exports = router