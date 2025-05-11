const usermodel = require("../models/user.model")
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