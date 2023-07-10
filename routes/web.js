const express = require('express')
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const AdminController = require('../controllers/admin/AdminController')
const BlogController = require('../controllers/admin/BlogController')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactController = require('../controllers/admin/ContactController')
const auth = require('../middleware/auth')

// FrontController routes
router.get('/',FrontController.home)
router.get('/about',FrontController.about)
router.get('/contact',FrontController.contact)
router.get('/blog',FrontController.blog)
router.get('/login',FrontController.login)
router.get('/register',FrontController.register)

// AdminController routes
router.get('/admin/dashboard',auth,AdminController.dashboard)
router.post('/adminregister',AdminController.register)
router.post('/verifylogin',AdminController.verifyLogin)
router.get('/logout',AdminController.logout)

// BlogController routes
router.get('/admin/blogdisplay',auth,BlogController.displayBlog)
router.post('/insertblog',BlogController.insertblog)
router.get('/admin/blogview/:id',auth,BlogController.blogView)
router.get('/admin/blogedit/:id',auth,BlogController.blogEdit)
router.post('/blogupdate/:id',auth,BlogController.blogupdate)
router.get('/admin/blogdelete/:id',auth,BlogController.blogDelete)
router.get('/blog-detail/:id',BlogController.blogDetail)

// CategoryController routes
router.get('/admin/categorydisplay',auth,CategoryController.displayCategory)
router.post('/insertcategory',CategoryController.insertCategory)
router.get('/admin/categoryview/:id',auth,CategoryController.categoryView)
router.get('/admin/categoryedit/:id',auth,CategoryController.categoryEdit)
router.post('/categoryupdate/:id',auth,CategoryController.categoryUpdate)
router.get('/admin/categorydelete/:id',auth,CategoryController.categoryDelete)

// ContactController routes
router.get('/admin/contactdisplay',auth,ContactController.contactDisplay)
router.post('/insertcontact',ContactController.insertContact)





module.exports = router
