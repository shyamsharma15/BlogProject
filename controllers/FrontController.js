const BlogModel = require('../models/Blog')


class FrontController{

 // render mai hum view walle page kaa name dette hai jisse us page ko show karra saken 

    static home = async(req , res)=>{
       try {
        const blogs = await BlogModel.find().sort({_id:-1}).limit(6) // yahan sort-1 se latest blog sabse uper show hoinge aur limit(6) se home page par kebal 6 blog show hoinge 
       // console.log(blogs)
        res.render("home",{b:blogs})
       } catch (error) {
        console.log(error)
       }
    }

    static about = async(req , res)=>{
       try {
        res.render("about")
       } catch (error) {
        console.log(error)
       }
    }

    static contact= async(req , res)=>{
        try {
            res.render("contact")
        } catch (error) {
            console.log(error)
        }
    }

    static blog= async(req , res)=>{
        try {
            const blogs = await BlogModel.find().sort({_id:-1}) // yahan sort -1 isliye kiya jisse recently add kiye hua blogs upper show hojaayinge
           // console.log(blogs)
            res.render("blog",{b:blogs})
        } catch (error) {
            console.log(error)
        }
    }

    static login= async(req , res)=>{
        try {
            res.render("login",{message:req.flash('error'),success:req.flash('success')})
        } catch (error) {
            console.log(error)
        }
    }

    static register= async(req , res)=>{
        try {
            res.render("register",{message:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }


}
module.exports = FrontController