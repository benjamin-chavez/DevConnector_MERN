const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

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
  (req, res) => {
    // Need to init middleware in the server.js file to get data in req.body
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return status 400: Bad Request
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("User route");
  }
);

// Export the router
module.exports = router;
