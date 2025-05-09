const usermodel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ msg: "You are not authorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "You are not authorized" });
    }
};

module.exports = { authUser };
