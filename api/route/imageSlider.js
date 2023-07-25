// api/route/imageSlider.js

const express = require("express");
const router = express.Router();
const Image = require("../../schema/ImageSlider");

// GET all images
router.get("/", async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      imageData: images,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error fetching images.",
    });
  }
});

// POST a new image
router.post("/", (req, res) => {
    const { Title, Description} = req.body;
  
    const image = new Image({
      Title,
      Description,
    //   ImgUrl: req.files['Image'][0].filename,
      
    });
  
    image.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          newImage: result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "Failed to save product",
        });
      });
  });

// DELETE an image
router.delete("/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const deletedImage = await Image.findByIdAndRemove(imageId);
    if (!deletedImage) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.status(200).json({
      deletedImage: deletedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Error deleting image.",
    });
  }
});

module.exports = router;
