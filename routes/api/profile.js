const express = require('express');
const router = express.Router();

// Bring in the Profile Model:
const Profile = require('../../models/Profile');

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

// Export the router
module.exports = router;
