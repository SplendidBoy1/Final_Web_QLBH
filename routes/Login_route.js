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
    next()
}, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}), controller_1.Login)

router.get('/register', controller_1.Register)
router.post('/register', controller_1.Register_account)
// router.get('/get_infor', controller_1.render_information);

// router.get('/landing', controller_1.Render_landing)

router.get('/admin', controller_1.Render_admin)

router.get('/', controller_1.Check_route)

router.get('/auth_google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  
router.get('/oauth2callback_google', passport.authenticate('google', {successRedirect:'/', failureRedirect: '/login', failureFlash: true }));

router.get('/auth_facebook',
    passport.authenticate('facebook', {scope: ['email']}));

router.get('/oauth2callback_facebook', passport.authenticate('facebook', {successRedirect:'/', failureRedirect: '/login', failureFlash: true}));

router.get('/logout', controller_1.Logout)

// router.get('/edit_page', controller_1.to_edit_page);

module.exports = router