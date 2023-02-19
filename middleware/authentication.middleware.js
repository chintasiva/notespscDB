const jwt=require("jsonwebtoken")

// const authenticate=(req,res,next)=>{
//     const token=req.headers.authorization
//     if(token){
//         const decoded=jwt.verify(token,"masai")
//         if(decoded){
//             next()
//         }else{
//             res.send('Please Login')
//         }
//     }else{
//         res.send('Please Login')

//     }
// }

// 

const authenticate = (req, res, next) => {
    const token = req.headers?.authorization
    if (token) {
        jwt.verify(token, "masai", (err, decoded) => {
            if (decoded) {
                console.log(decoded.userID);
                req.body.user= decoded.userID  //userid will be connected to node module user,    inside note userID will be given so that only perticular user can see only his notes having same userID
                next()
            } else {
                res.send({ "msg": "Please Login" })
            }
        })
    } else {
        res.send({ "msg": "Please Login Now" })
    }
}

module.exports={authenticate}