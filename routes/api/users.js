const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

// Bring in the User Model:
const User = require("../../models/User");

// @route   GET api/users
// @desc    Test route
// @access  Public
// router.get("/", (req, res) => res.send("User route"));

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
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
    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get user's gravatar (based on email)
      const avatar = gravatar.url(email, {
        s: "200", // default size
        r: "pg", // rating
        d: "mm", // default image
      });

      // Create new user instance (not saved yet)
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Generate Bycrypt Hashing Salt for password hashing
      const salt = await bcrypt.genSalt(10);

      // Encrypt the password using bycrypt
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return the jsonwebtoken (to auto login users after acct registration)
      res.send("User registered");

      res.send("User route");
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Export the router
module.exports = router;
