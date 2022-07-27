const { Router } = require('express')

// Controller imports
const { getMetrics } = require('../controllers/patient')

const router = Router()

// Patient
router.get('/metrics', getMetrics)


module.exports = router