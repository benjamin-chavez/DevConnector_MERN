const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Bring in the Profile Model:
const Profile = require('../../models/Profile');
// Bring in the User Model:
const User = require('../../models/User');

// @route   GET api/profile/me
// @desc    Get current user's profile route
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Export the router
module.exports = router;
