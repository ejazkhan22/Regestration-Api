// const usermodel = require("../models/user.model");
// const jwt = require("jsonwebtoken");

// const authUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   const token = req.cookies?.token || (authHeader && authHeader.startsWith("Bearer ") && authHeader.split(" ")[1]);

//   if (!token) {
//     return res.status(401).json({ msg: "You are not authorized, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await usermodel.findById(decoded._id);

//     if (!user) {
//       return res.status(401).json({ msg: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("JWT verify error:", err);
//     res.status(401).json({ msg: "You are not authorized" });
//   }
// };

// module.exports = { authUser };
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ msg: "Authentication Required" });
    }

    const decoded = jwt.verify(token, "secretKey");
    const user = await usermodel.findById(decoded._id);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ msg: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ msg: "Authentication Required" });
  }
};


module.exports = { authUser };
