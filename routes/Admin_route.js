const express = require('express')
const controller_1 = require('../controllers/Admin_c.js')


//import controller_1 from '../controllers/Login.js'

// const passport = require('passport')

const router = express.Router();

// app.get('/', async (req, res) => {
//     res.render('home', {result: 0})
// })

// initializePassport()

router.post('/update_user', controller_1.Update_user)

router.post('/search_email', controller_1.Search_email)

router.post('/delete_user', controller_1.Delete_email)

router.post('/add_user', controller_1.Add_user)
// router.get('/edit_page', controller_1.to_edit_page);

module.exports = router