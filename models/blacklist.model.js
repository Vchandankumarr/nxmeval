const mongoose=require("mongoose")

const blacklistSchema=mongoose.Schema({
    blacklist_token:{
        type:String
    }
})

const Blacklist=mongoose.model("blacklist",blacklistSchema)

module.exports={
    Blacklist
}