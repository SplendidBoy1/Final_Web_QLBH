const express = require('express');
const clientProfileController = require('../controllers/ClientProfile_c.js');
const router = express.Router();

router.get('/profile', clientProfileController.renderProfile);
router.post('/profile/edit', clientProfileController.updateProfile);

module.exports = router;
