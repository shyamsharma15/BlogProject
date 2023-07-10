const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectdB = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cloudinary = require('cloudinary');
const session = require('express-session')
const flash = require('connect-flash')
// cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())





// database connection 
connectdB()
// to convert url data into json form
app.use(express.urlencoded({extended:false}))  // isse data uth kar aagyega (wesse data url ki form mai uth kar aata hai par iss code ki help se data json ki form mai convert karke console mai dikha dega)

// for image file upload in cloudinary
app.use(fileUpload({useTempFiles:true}));

// to show flash messages during registration and login
app.use(session({
  secret:'secret',
  cookie:{ maxAge:60000 },
  resave:false,
  saveUninitialized:false
}));

app.use(flash());

// router load
app.use('/',web)

// ejs setup template engine
app.set('view engine', 'ejs')

// public folder setup
app.use(express.static('public'))








// server create
app.listen(port, () => {
    console.log('server start localhost:3000')
  })