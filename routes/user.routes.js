const express = require('express');
const router = express.Router();
const {body}= require("express-validator")
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware.js")





router.post("/api/register",[
    body("email").isEmail().withMessage("Email is not valid"),
    body("fullname.firstname").isLength({min:3}).withMessage("Firstname must be at least 3 characters long   "  ),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],
userController.registerUser
)

router.post("/api/login",[
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long")
],


userController.loginUser

,
)
router.get("/api/profile",authMiddleware.authUser,userController.getUserProfile)
router.get("/",authMiddleware.authUser,
userController.getallusers)

module.exports = router;