const express=require("express")

require("dotenv").config()

const {connection}=require("./config/db")
const {userrouter}=require("./routes/userrouter")
const {produtrouter}=require("./routes/product.router")
const app=express()

app.use(express.json())

app.get("/",async(req,res)=>{
    try {
        res.send("welcome to eval2")
    } catch (error) {
        
    }
})

app.use("/user",userrouter)
app.use("/product",produtrouter)


app.listen(process.env.port,async()=>
{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at port ${process.env.port}`)
})