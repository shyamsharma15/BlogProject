const mongoose = require('mongoose')


// defining schema 

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        public_id:{
            type:String,
        },
        url:{
           type:String,
        }
    }
},{timestamps:true}) // timestamps ki help se humme date aur time mil jaayega ki kab humne blog ko update kiya tha automatically.


// create collection 
// here blog is the name of collection and BlogSchema mai collection ki fields aarhi hai 
const BlogModel = mongoose.model('blog',BlogSchema)
module.exports = BlogModel
