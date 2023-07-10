const AdminModel = require("../../models/admin")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') // token generate ke liye yea package install kiya tha
const auth = require('../../middleware/auth')


class AdminController {

   static dashboard = (req, res) => {

      try {
         const{name,email} = req.admin
         res.render('admin/dashboard',{n:name,e:email})
      } catch (error) {
         console.log(error)
      }

   }

   static register = async (req, res) => {
      try {
         // yahan name ,email,password aur confirm_password wo hai jo form ke input ke name mai diye the 
         const { name, email, password, confirm_password } = req.body
         const admin = await AdminModel.findOne({ email: email }) // 1st email jo model mai define kiya hai wo hai aur doosera email jo uper se aarha hai 

         if (admin) {
            req.flash('error', 'Email already exists')
            res.redirect('/register')
         } else {
            if (name && email && password && confirm_password) {
               if (password == confirm_password) {

                  const hashpassword = await bcrypt.hash(password , 10)

                  const register = await new AdminModel({
                     name: name,
                     email: email,
                     password: hashpassword,
                  });
                  await register.save();
                  req.flash('success', 'Registration successfully please login here...')
                  res.redirect('/login');

               } else {
                  req.flash('error', 'Password and Confirm Password does not match')
                  res.redirect('/register')
               }
            } else {
               req.flash('error', 'All fields are required')
               res.redirect('/register')
            }
         }

      } catch (error) {
         console.log(error)
      }
   }

   static verifyLogin = async(req,res)=>{
      try {
         //console.log(req.body)
         const{email,password} = req.body
         if(email && password){
            const admin = await AdminModel.findOne({email:email})

            if(admin != null){
                const ismatched = await bcrypt.compare(password,admin.password) // jis bande kaa email hai kya yea password bhi ussi kaa hai yaa nhi yea check karinge
               if(ismatched){
                  // generate jwt token
                  const token = jwt.sign({id:admin._id},'shyamsharma15062002@123456789') // yahan token bna liya admin(jo login kar rha hai )ki id aur secret key ki help se
                  //console.log(token)
                  res.cookie('token',token) // token variable  mai token ko store kar liya
                  //console.log(token)
                   res.redirect('/admin/dashboard')
               }else{
                  req.flash('error', 'Email or Password does not match')
                  res.redirect('/login')
               }
            }else{
               req.flash('error', 'You are not registered user')
               res.redirect('/login')
            }

         }else{
               req.flash('error', 'All fields are required')
               res.redirect('/login')
         }
      } catch (error) {
         console.log(error)
      }
   }

   static logout = async(req,res)=>{
      try {
         res.clearCookie('token') //  logout se pahelle token ko expire karna padega isliye clearCookie
         res.redirect('/login')
      } catch (error) {
         console.log(error)
      }
   }




}
module.exports = AdminController