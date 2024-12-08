const express = require('express')
const controller_1 = require('../controllers/Login.js')
//const oAuth = require('../middleware/OAuth2_Google.js')
//const passport = require('passport');

const router = express.Router();

router.get('/login', controller_1.Login_Page)
router.get('/register', controller_1.Register_Page)

module.exports = router