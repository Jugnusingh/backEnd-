const express = require("express")
const router = express.Router()
const Image = require("../../schema/ImageSlider")
router.get("/", async(req, res) => {
    console.log(req,"dfads")
    Image.find()
        .then((result) => {
            res.status(200).json({
                imageData: result
            })
        }).catch((error) => {
            console.log(error);
            res.status(200).json({
                error:error
            })
        })
})
router.post("/", (req, res) => {

    const image = new Image({
        Title: req.body.Title,
        Description: req.body.Description,
        Image:req.body.ImgUrl
    })
    image.save()
        .then((result) => {
            console.log(result)
            res.status(200).json({
                newImg: result
            })
        }).catch((error) => {
            console.log(error)
            res.status(500).json({
                error: error
            })
        })
})

module.exports = router