const usermodel = require("../models/user.model.js")
const userService = require("../servvices/user.service")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator")



module.exports.registerUser =async(req,res,next)=>{
const errors = validationResult(req)
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
}
const {fullname,lastname,email,password} = req.body

const hashPassword = await usermodel.hashPassword(password)
const user =await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashPassword
})
const token =user.generateAuthToken()
res.status(200).json({token,user})

}
module.exports.loginUser= async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    const user = await usermodel.findOne({email}).select("+password")
    if(!user){
        return res.status(401).json({massage:"Invalid Credentials"})
    }
const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).json({massage:"Invalid Credentials"})
    }
    const token = user.generateAuthToken()
    res.cookie("token",token)
    res.status(200).json({token,user})

}
module.exports.getUserProfile= async(req,res,next)=>{
    res.status(200).json(req.user);

}
module.exports. getallusers = async (req, res) => {
  try {
    const data = await usermodel.find({});

    res.status(200).json({
      message: "get all users successful",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

