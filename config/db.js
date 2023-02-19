const mongoose=require('mongoose')
mongoose.set('strictQuery', true)
const connection=mongoose.connect("mongodb+srv://shiva:avihs@cluster0.le01f.mongodb.net/notespsc?retryWrites=true&w=majority")


module.exports={connection}