const ContactModel = require('../../models/Contact')


class ContactController{

    static insertContact = async(req,res)=>{
        try {
            //console.log('hello')
            const data = new ContactModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
            })
            await data.save()
           // console.log(data)
           res.redirect("/contact") // redirect mai route ke url aate hai 

        } catch (error) {
            console.log(error)
        }
    }

    static contactDisplay = async(req,res)=>{
        try {
            const result = await ContactModel.find()
            // console.log(result)

            res.render('admin/contact/display',{d:result})
            
        } catch (error) {
            console.log(error)
        }
    }



}

module.exports = ContactController