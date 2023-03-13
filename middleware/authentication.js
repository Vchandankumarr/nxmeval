const jwt = require('jsonwebtoken');

require("dotenv").config()
const {Blacklist}=require("../models/blacklist.model")

const authentication=async(req,res,next)=>{

    let token =req.headers.authorization;
   
    try {
       
        let blacklist_token=await Blacklist.find({blacklist_token:token})
        
        if(blacklist_token.length>0){
            res.send("token is blacklisted please login")
        }else{
            jwt.verify(token, process.env.access_token, async(err, decoded)=>{
               if(err){
                
                res.send("Please login"+err)
               }else{
                userid=decoded.userid;
                role=decoded.role
                console.log(userid,role)

                req.body.userid=userid;
                req.body.role=role;
                next()
               }
              });
        }
    } catch (error) {
        res.send(" 11111111     please login")
    }
}

module.exports={
    authentication
}