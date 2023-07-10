const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

},{timestamps:true})

// yahan par admin collection ka name hai aur AdminSchema mai saari fields hai collection ki 

const AdminModel = mongoose.model('admin',AdminSchema)

module.exports = AdminModel