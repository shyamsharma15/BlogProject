const jwt = require('jsonwebtoken')

const AdminModel = require('../models/admin') // kyunki issi mai to user (admin) kaa data uth kar aarha hai

const checkAdminAuth = async (req, res, next) => { // jab sabkuch check ho jaayega tab next ki help se admin dashbard khul jaayega

    // console.log('hello middleware')
    const { token } = req.cookies // isse token uth kar aagyega
    //console.log(token)
    if (!token) {
        req.flash('error', 'Unauthorized admin')
        res.redirect('/login')

    } else {
        const data = jwt.verify(token, 'shyamsharma15062002@123456789')
        // console.log(data) // isse id print ho jaayegii jisse apan login kar rhae hai 
        const admin = await AdminModel.findOne({_id:data.id})// yahan humne admin jo login kar rha hai uski id humne _id mai get karli 
        //console.log(admin)
        req.admin = admin // isse hammara admin jisle login kiya hai uska data req.admin mai bhej diya jisse dashboard par admin kaa name aur email show kar saken 
        next()
    }

}

module.exports = checkAdminAuth