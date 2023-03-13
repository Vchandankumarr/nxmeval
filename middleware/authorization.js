

const authorise=(role_array)=>{
    return(req,res,next)=>{
        const userrole=req.body.role;
        if(role_array.includes(userrole)){
            next()
        }else{
            res.send({"message":"You are not authorized"})
        }
    }
}

module.exports={
    authorise
}