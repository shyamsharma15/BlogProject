const mongoose = require('mongoose')

// defining schema

const ContactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    },
},{timestamps:true})


// create collection 
// here Contact is the name of collection and ContactSchema mai collection ki fields aarhi hai
const ContactModel = mongoose.model('Contact',ContactSchema)

module.exports = ContactModel