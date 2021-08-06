const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {User} = require('../User/user.model')

exports.auth = async(req,res,next) => {

    const token = req.header("Authorization").replace("bearer ","");
    // console.log(token)
    const decoded = jwt.verify(token,process.env.SECRET);
    // console.log(decoded)
    const user = await User.findOne({name:decoded.name});
    // console.log(user.token)
    // console.log(token)
    //this is as the token is an array 
    // if (!user.tokens.includes(token)){
    //     console.log("test1")
    //     throw new Error("Failed Auth")
    // } else{console.log("test2")
    // req.user  = user
    // req.token = token
    // }

    req.user  = user
    req.token = token
    next()
}