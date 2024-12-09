const express = require('express')
const controller_1 = require('../controllers/Login.js')
const passport = require('passport');


//import controller_1 from '../controllers/Login.js'

// const passport = require('passport')

const router = express.Router();

// app.get('/', async (req, res) => {
//     res.render('home', {result: 0})
// })

// initializePassport()


router.get('/login', controller_1.Login)
router.post('/login',(req,res, next) => {
    console.log(req.body)
    next()
}, passport.authenticate('local', {
    successRedirect: '/main_admin',
    failureRedirect: '/login',
}), controller_1.Login)

router.get('/register', controller_1.Register)
router.post('/register', controller_1.Register_account)
// router.get('/get_infor', controller_1.render_information);

router.get('/main_admin', controller_1.Main_admin)

// router.get('/edit_page', controller_1.to_edit_page);

module.exports = router