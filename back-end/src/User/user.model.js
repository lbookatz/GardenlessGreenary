const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userAdmin :{
        type:Boolean
    },
    token :{
        type:Array
    },
    plants:{
        type:Array
    },
    todo:[{
        id:Number,
        text:String,
        status:String,
        datecreated:{ type: Date, default: Date.now },
    },],

});

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findone({email});
    if (!user){
        throw new Error('unable to login')
    }

    const passwordsMatch = await bcrypt.compare(password,user.password);
    if (!passwordsMatch) {
        throw new Error('Unable to login');
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id: this._id}, process.env.Secret,{});
    this.tokens.push();
    return token;
}

const User = mongoose.model('user',userSchema);

module.exports = { 
    User
}

