const mongoose = require('mongoose')

// defining schema 

const CategorySchema = new mongoose.Schema({
    cat_name:{
        type:String,
        required:true

    }
    
},{timestamps:true}) // timestamps ki help se humme date aur time mil jaayega ki kab humne blog ko update kiya tha automatically.


// create collection 
// here Category is the name of collection and CategorySchema mai collection ki fields aarhi hai 
const CategoryModel = mongoose.model('Category',CategorySchema)
module.exports = CategoryModel
