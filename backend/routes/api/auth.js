const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Get user by token
// @access  Private
router.get('/', auth, async (req, res) => {
  // res.send('Auth route'));
  try {
    //`.select('-password')` removes password from returned object
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token (Login User)
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    // Need to init middleware in the server.js file to get data in req.body
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return status 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure the request body
    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      // FIXME: YOU COULD DRY THESE ERROR RESPONSE CONDITIONS
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Verify that entered password matches user's actual password
      // bcrypt.compare(plainTextPassword, encryptedPassword);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      // Return the jsonwebtoken (to auto login users after acct registration)
      // res.send("User registered");
      const payload = {
        user: {
          // MongoDB uses `._id`, mongoose has an abstraction layer so `.id` works fine
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // FIXME: Change back to 3600 when deploying
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          // You could send the user ID back to the cleint here instead of sending the token
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Export the router
module.exports = router;
