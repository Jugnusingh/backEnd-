// const express = require("express")
// const router = express.Router()
// const Assignment = require("../../schema/assignmentSchema")


// router.get("/", (req, res) => {
//     console.log(req,res,"dfads")
//     Assignment.find()
//         .then((result) => {
//             res.status(200).json({
//                 assignmentData: result
//             })
//         }).catch((error) => {
//             console.log(error);
//             res.status(200).json({
//                 error:error
//             })

//         })
// })
// router.post("/", (req, res) => {

//     const assignment = new Assignment({
//         Title: req.body.Title,
//         Price: req.body.Price,
//         Description: req.body.Description,
//         Category: req.body.Category,
//         Image:req.body.Image
//     })
//     assignment.save()
//         .then((result) => {
//             console.log(result)
//             res.status(200).json({
//                 newProduct: result
//             })
//         }).catch((error) => {
//             console.log(error)
//             res.status(500).json({
//                 error: error
//             })
//         })
// })

// module.exports = router