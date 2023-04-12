const express = require("express")
const router = express.Router()
const LoginRoute = require("../../schema/loginSchema")


router.post("/",(req,res)=>{
    console.log(req.body.username)
    const loginRoute = new LoginRoute({
        Username: req.body.username,
        Password: req.body.password,
    })
    loginRoute.save()
        .then((result) => {
            res.status(200).json({
                newLogin: result
            })
        }).catch((error) => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})


module.exports = router