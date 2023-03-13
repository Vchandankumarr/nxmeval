const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["customer","seller"]
    }
})

const User=mongoose.model("user",userSchema)

module.exports={
    User
}