const express=require("express")
const { BlogModel } = require("../model/Blog.model")

const blogRouter=express.Router()

blogRouter.get("/",async(req,res)=>{
   const blog=await BlogModel.find()
    res.send(blog)
})

blogRouter.post("/create",async(req,res)=>{
    const payload=req.body
    try {
        const blog=new BlogModel(payload)
        await blog.save()
        res.send("Created the Blog")
    } catch (error) {
        res.send({"msg":"Something went wrong"})
    }
})

// blogRouter.patch("/update/:id",(req,res)=>{
//     // const payload=req.body
//     res.send("Blogs has been Updated")
// })
blogRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const note = await BlogModel.findOne({ '_id': id })
    console.log(note);
    const userID = req.body.user
    // console.log('user ID from db', note.user);
    // console.log('from req.body', userID);
    try {
        if (note.user !== userID) {
            res.send({ "msg": "You are not authorized to perform this operation" })
        } else {
            await BlogModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Updated the note")
        }
    } catch (err) {
        console.log(err)
        res.send({ "msg": "Something went wrong" })
    }
})

    blogRouter.delete("/delete/:id", async (req, res) => {
        const noteID = req.params.id
        const note = await BlogModel.findOne({ '_id': noteID }) 
        console.log(note);
        const userID = note.user
        // console.log('user ID from db', note.user);
        // console.log('from req.body', req);
    
        try {
            if (note.user !== userID) {
                res.send({ "msg": "You are not authorized to perform this operation" })
            } else {
                await BlogModel.findByIdAndDelete({ _id: noteID })
                res.send(`Note with id ${id} has been deleted`)
            }
        } catch (err) {
            res.send({"err":err})
        }
    }) 

    // noteRouter.delete("/delete/:id", async (req, res) => {
    //     const id = req.params.id
    //     const payload = req.body
    //     const note = await NoteModel.findOne({ "_id": id })
    //     const nodeID = note.user
    //     try {
    //         console.log(req.body.user, nodeID)
    //         if (req.body.user !== nodeID) {
    //             res.send({ "msg": "You are not Authorized" })
    //         } else {
    //             await NoteModel.findByIdAndDelete({ _id: id })
    //             res.send(" Note deleted")
    //         }
    //     } catch (err) {
    //         res.send(err)
    //     }
    // })


module.exports={
    blogRouter
}