const router = require('express').Router()
const usercontroller = require('../Controller/usercontroller')

const express = require('express');
const multer = require('multer')
const path = require('path')

const { check, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "./public/")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, "E:/privateblogging/public/images");
        // cb(null, "C:/Training/reactjs/node_js/BloggingApp/frontend/public/images");
        cb(null, "C:/Training/reactjs/node_js/UserData Management App/client/public/images");

    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});
let upload = multer({
    storage: storage,
}).single('myimage')

router.post('/adduser',upload,
   [check('fname').isLength({ min: 3 }).isAlpha('en-US', {ignore: ' '}).withMessage('Character only accepted with min 3 '),
    check('address').isLength({ min: 10 }).isAlphanumeric('en-US', {ignore: ','}).isAlphanumeric('en-US', {ignore: ' '}).withMessage('Character only accepted'),
    check('email').isEmail().withMessage('Enter Valid Email'),
    check('dept').isLength({ min: 2 }).isAlpha().withMessage('Character only accepted '),
    check('mobile').isMobilePhone('en-IN').withMessage('Enter valid mobile no'),
],
 usercontroller.adduser)
router.get('/getuser',usercontroller.getuser)
router.post('/edituser/:id', usercontroller.edituser)
router.get('/deleteuser/:id', usercontroller.deleteuser)


module.exports = router