const express = require('express')
const controller_1 = require('../controllers/Login.js')
//const oAuth = require('../middleware/OAuth2_Google.js')
//const passport = require('passport');

const router = express.Router();

router.get('/', controller_1.Login)


module.exports = router