const BlogModel = require('../../models/Blog');
const CategoryModel = require('../../models/Category');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: 'dxgc3lozv', 
    api_key: '567333937548657', 
    api_secret: 'S3ahzgvK1y-9_z79CQek3asqdPc',
    //secure: true
  });



class BlogController {

    static displayBlog = async(req, res) => {
        
        try {
           const data = await BlogModel.find() // blog model kaa data yahan uth kar aagyega
           //console.log(data)
           res.render('admin/blog/display',{d:data}) // isse hummara data display.ejs walle page par aagyea 
        } catch (error) {
            console.log(error)
        }
       
    }

    static insertblog = async (req, res) => {
        try {
            //console.log(req.files.image)
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'blogImage',
            })
            const result = new BlogModel({
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }
            })
            await result.save()

            res.redirect('/admin/blogdisplay') // redirect ke under route kaa url lette hai (jahan par aapko jaana hai )

           // console.log(myimage)
           
            //const result = await BlogModel.create(req.body) // yea 1st tarrika hai data ko insert karane mai BlogModel mai . lekin iss tarike mai jo input mai name hai aur jo collection ki fields hai wo same honna chaiye 
            //const result = new BlogModel({ // yea 2nd tarrika hai data ko model mai insert karane ka object banake 
            // title:req.body.title, // yahan 1st title schema walla hai aur 2nd title form mai input ke name mai jo hai wo hai 
            // description:req.body.description,
              
            //await result.save() // yahan save data ko save karke model ke pass bhej rha hai aur fir collection ka name aur fields check karega fir mongo db jaayega aur collection ka name aur field check karke data insert kardega 
            //console.log(result)
            //res.redirect('/admin/blogdisplay') // redirect ke under route kaa url lette hai (jahan par aapko jaana hai )
            }
            
        catch (error) {
            console.log(error)
        }
    }

    static blogDetail = async(req,res)=>{
        try {
           // console.log(req.params.id)
            const blog = await BlogModel.findById(req.params.id)
            const recentblog = await BlogModel.find().limit(6)
            const category = await CategoryModel.find()
            //console.log(recentblog)
             res.render('blog-detail',{b:blog,r:recentblog,c:category})
           
        } catch (error) {
            console.log(error)
        }
    }

    static blogView = async(req,res)=>{
        try {
            //console.log(req.params.id)
            const result = await BlogModel.findById(req.params.id)
           //console.log(result)
           res.render('admin/blog/view',{view:result})
        } catch (error) {
            console.log(error)
        }
    }

    static blogEdit = async(req,res)=>{
        try {
            const result = await BlogModel.findById(req.params.id)
           // console.log(result)
            res.render('admin/blog/edit',{edit:result})
        } catch (error) {
            console.log(error)
        }
    }

    static blogupdate = async(req,res)=>{
        try {
            //console.log(req.params.id)
            //console.log(req.body)
            // image ko update karne se pahelle usse delete karne ke liye code
            const blog = await BlogModel.findById(req.params.id)
            const imageid = blog.image.public_id 
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            // update image code
            const file = req.files.image
            const myimage = await cloudinary.uploader.upload(file.tempFilePath,{
                folder:'blogImage',
            })

            const update = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image:{
                    public_id:myimage.public_id,
                    url:myimage.secure_url
                }

            })
            await update.save()
            res.redirect('/admin/blogdisplay')

        } catch (error) {
            console.log(error)
        }
    }

    static blogDelete = async(req,res)=>{
       
        try {
            // server se image ko delete karne ke liye code
            const blog = await BlogModel.findById(req.params.id) // jisse jis record ko delete karna hai uski id lelo 
            const imageid = blog.image.public_id // yahan blog mai se image ki id nikali
            //console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

             // console.log(req.params.id)
             // console.log(req.body)
        const deleteblog = await BlogModel.findByIdAndDelete(req.params.id)
        res.redirect('/admin/blogdisplay')
            
        } catch (error) {
            console.log(error)
        }
    }

   









}
module.exports = BlogController