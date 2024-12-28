const express = require('express')

const controller_1 = require('../controllers/Payment_c.js')

// const passport = require('passport')

const router = express.Router();

// app.get('/', async (req, res) => {
//     res.render('home', {result: 0})
// })

// initializePassport()

router.get('/account_balance', controller_1.authenticateToken, controller_1.Take_account)

router.post('/paying_order', controller_1.Paying)

router.register('/register_account', controller_1.Register_account)

// router.get('/edit_page', controller_1.to_edit_page);



module.exports = router