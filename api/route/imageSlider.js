const express = require("express");
const router = express.Router();
const Image = require("../../schema/ImageSlider");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

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
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Title, Description } = req.body;
    const ImgUrl = req.file ? req.file.filename : null; // Get the uploaded image filename if available

    const newImage = new Image({ Title, Description, ImgUrl });
    const savedImage = await newImage.save();

    res.status(201).json(savedImage);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
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
