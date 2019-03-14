var mongoose = require("../db/mongodb").mongoose;

var UserSchema = new mongoose.Schema({
    userId:String,
    password: {type: String,default:null},
});

var UserModel = mongoose.model('Password', UserSchema);

exports.UserModel = UserModel;