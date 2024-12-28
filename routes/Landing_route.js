const express = require('express')
const controller_1 = require('../controllers/Landing.js')
const passport = require('passport');


//import controller_1 from '../controllers/Login.js'

// const passport = require('passport')

const router = express.Router();

// app.get('/', async (req, res) => {
//     res.render('home', {result: 0})
// })

// initializePassport()



router.get('/landing', controller_1.Landing);

// router.get('/edit_page', controller_1.to_edit_page);

module.exports = router