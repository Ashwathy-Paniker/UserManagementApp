const usermodel = require('../Model/userschema')
const { check, validationResult } = require('express-validator');

const usercontroller = {

    adduser: async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            res.status(200).json({ status: 401, "err": "Something went wrong with input you entered.Please recheck it !" })
            console.log(errors.array())
        }
        else{
            console.log("hello")
        console.log(req.body)
        // console.log(req.file)
        let fname = req.body.fname;
        let email = req.body.email;
        let address = req.body.address;
        let mobile = req.body.mobile;
        let dept = req.body.dept;
        let myimage = (req.file) ? req.file.filename : null;
        let ins = new usermodel({ fname: fname,  email: email, address: address, mobile: mobile, dept: dept ,myimage:myimage});
        await ins.save((err) => {
            console.log(ins)
            if (err) {
                res.json({ status: 401, "err": "Something went wrong.Might be User registered already !" })
            } else {
                res.json({ status: 200, "msg": "User Registered Successfully !!" })
            }

        })
    }
    },
    
    getuser: async (req,res)=>{
            await usermodel
              .find()
              .then((user) => {
                console.log(user);
                res.json({ user: user });
              });       
    },
    edituser: async (req, res) => {
        console.log(req.body)
        try {            
            console.log(req.params.id)
            await usermodel.findByIdAndUpdate( req.params.id, { $set: req.body })
            res.status(200).json("User updated successfully");
        } catch (error) {
            res.status(500).json("ERROR IN UPDATE");
        }
      },
      deleteuser: async (req, res) => {
        console.log(req.params.id)
        try {            
            console.log(req.params.id)
            await usermodel.findByIdAndDelete(req.params.id);
            res.status(200).json("User Deleted");
        } catch (error) {
            res.status(500).json("ERROR IN DELETE");
        }
      }
}
module.exports = usercontroller
