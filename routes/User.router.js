const express = require("express");
const { UserModel } = require("../model/User.model");
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
    const user= await UserModel.find()
    res.send(user)
})


userRouter.post("/register", async (req, res) => {
    const { email, pass, name } = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            if (err) {
                res.send({ "msg": "Something went Wrong", "err": err })
            } else {
                const user = new UserModel({ name, email, pass: hash })
                await user.save()
                res.send({ "msg": "New User has been Registered" })
            }
        })
    } catch (error) {
        console.log(error)
        res.send({ "msg": "Not able to Registered", "error": error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email })
        if (user.length > 0) {
            bcrypt.compare(pass,user[0].pass,function(err,result){
                if(result){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in","token":token})
                }else{
                    res.send({"msg":"Wrong Credentials"})
                }
            });
        }else{
            res.send({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.send({ "msg": "Something went Wrong", "error": err })
    }
})


module.exports = { userRouter }