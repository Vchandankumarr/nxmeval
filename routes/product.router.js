const express=require("express")


const produtrouter=express.Router()

const {authentication}=require("../middleware/authentication")
const {authorise}=require("../middleware/authorization")


produtrouter.get("/",authentication,(req,res)=>
{
    res.send("products page")
})




produtrouter.post("/addproducts",authentication,authorise(["seller"]),(req,res)=>
{
    res.send("add products")
})


produtrouter.delete("/deleteproducts",authentication,authorise(["seller"]),(req,res)=>
{
    res.send("delete products")
})




module.exports={
    produtrouter
}





