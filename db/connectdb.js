const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/blogproject"
const live_Url = 'mongodb+srv://shyamsharma15062002:shyam123@cluster0.i8cnuld.mongodb.net/blogproject?retryWrites=true&w=majority'



const connectDB = ()=>{
    return mongoose.connect(live_Url)


    .then(()=>{
        console.log("Database connected.... ")
    })
    .catch((error)=>{
        console.log(error)
    })
}

module.exports = connectDB