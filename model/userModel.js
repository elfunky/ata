const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{type:String},
    pass:{type:String},
    name:{type:String},
    number:{type:String},
});

module.exports = mongoose.model('users',userSchema);
