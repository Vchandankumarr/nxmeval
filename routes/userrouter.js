const express=require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const {User}=require("../models/user.model")
const {Blacklist}=require("../models/blacklist.model")
const {authentication}=require("../middleware/authentication")

const userrouter=express.Router()

userrouter.get("/",async(req,res)=>
{
    try {
        res.send("user router")
    } catch (error) {
        
    }
})


// signup


userrouter.post("/signup",async(req,res)=>
{
    const {name,email,password,role}=req.body
    try {
        let existing_user=await User.find({email})
        if(existing_user.length>0)
        {
            res.send("already signed up please login")
        }else{
            bcrypt.hash(password, 5, async(err, hash)=> {
                if(err){
                    res.send(err)
                }else{
                    let new_user=new User({name,email,password:hash,role})
                 await   new_user.save()
                 res.send("new user signed up sucessfully")
                }
            });
        }
    } catch (error) {
        res.send(error)
    }
})


// login

userrouter.post("/login",async(req,res)=>
{
    let {email,password}=req.body
    try {
        let user=await User.find({email})
        if(user.length>0){

            bcrypt.compare(password, user[0].password, async(err, result) =>{
                if(result){
                    const token = jwt.sign({ userid:user[0]._id,role:user[0].role }, process.env.access_token,{expiresIn:"1m"});
                    const refresh_token = jwt.sign({ userid:user[0]._id,role:user[0].role }, process.env.refresh_token,{expiresIn:"5m"});
                    res.send({"message":'login sucessfull',token,refresh_token})
                }else{
                    res.send("wrong credentials")
                }
            });
        }else{
            res.send("wrong credentials")
        }
    } catch (error) {
        res.send(error)
    }
})



// logout

userrouter.get("/logout",authentication,async(req,res)=>
{
    let token=req.headers.authorization;
    console.log(token)
    try {
        let blaclist_token=new Blacklist({blacklist_token:token})
        await blaclist_token.save()
        res.send("token blacklisted")
    } catch (error) {
            res.send("please login")
    }
})


// getting token using refresh token

module.exports={
    userrouter
}