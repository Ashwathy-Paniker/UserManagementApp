const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    dept: {
        type: String,
        required: true
    },
    myimage: {type: String},

    
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("adduser",UserSchema);