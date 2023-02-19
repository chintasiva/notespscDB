const mongoose=require("mongoose")

const blogSchema=mongoose.Schema(
    {
        title:String,
        blog:String,
        category:String,
        user:String
    }
)

const BlogModel=mongoose.model("blog",blogSchema)

module.exports={BlogModel}