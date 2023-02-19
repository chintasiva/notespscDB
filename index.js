const express = require("express")
const { connection } = require("./config/db")
const { authenticate } = require("./middleware/authentication.middleware")
const { blogRouter } = require("./routes/Blog.router")
const { userRouter } = require("./routes/User.router")
require("dotenv").config()


const app = express()
app.use(express.json())


app.use("/users",userRouter)
app.use(authenticate)
app.use("/blogs",blogRouter)


app.listen(process.env.port, async (req, res) => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log("Runnin port At 8080")
})