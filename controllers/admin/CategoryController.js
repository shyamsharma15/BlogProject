const CategoryModel = require('../../models/Category')

class CategoryController {

    static displayCategory = async (req, res) => {
        try {
            const data = await CategoryModel.find()
            // console.log(data)
            res.render('admin/category/display', { d: data })

        } catch (error) {
            console.log(error)

        }


    }

    static insertCategory = async (req, res) => {

        try {
            // const data = await CategoryModel.create(req.body)  // yea 1st tarrika hai data ko insert karane mai CategoryModel mai . lekin iss tarike mai jo input mai name hai aur jo collection ki fields hai wo same honna chaiye 
            const result = new CategoryModel({ // yea 2nd tarrika hai 
                cat_name: req.body.cat_name,
            })
            await result.save()
            //console.log(result)
            res.redirect('/admin/categorydisplay')
        } catch (error) {
            console.log(error)
        }

    }

    static categoryView = async (req, res) => {

        try {
            //console.log(req.params.id)
            const result = await CategoryModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/category/view',{view:result})
        } catch (error) {
            console.log(error)
        }

    }

    static categoryEdit = async (req, res) => {

        try {
            //console.log(req.params.id)
            const result = await CategoryModel.findById(req.params.id)
            //console.log(result)
            res.render('admin/category/edit',{edit:result})
        } catch (error) {
            console.log(error)
        }

    }

    static categoryUpdate = async (req, res) => {

        try {
            //console.log(req.params.id)
            //console.log(req.body)
            const update = await CategoryModel.findByIdAndUpdate(req.params.id,{
                cat_name:req.body.cat_name,
            })
            await update.save()
            res.redirect('/admin/categorydisplay')
    
        } catch (error) {
            console.log(error)
        }

    }

    static categoryDelete = async (req, res) => {

        try {
            //console.log(req.params.id)
            //console.log(req.body)
            const deletecategory = await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/categorydisplay')
    
        } catch (error) {
            console.log(error)
        }

    }




}
module.exports = CategoryController