import express from 'express'
import controller from './controller.js'

const router = express.Router()

router.post('/login',controller.login)
router.post('/addIncome',controller.addIncome)
router.post('/addcustomer',controller.addcustomer)


router.get('/incomehistory',controller.incomeHistory)


export default router




