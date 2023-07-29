const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Blog = require("../../schema/blogSchema");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Create a new blog
router.post("/", upload.single("Image"), async (req, res) => {
  try {
    const { Title, Content } = req.body;
    const Image = req.file ? req.file.filename : null; // Get the uploaded image filename if available

    const newBlog = new Blog({ Title, Content, Image });
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Update a blog
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { Title, Content } = req.body;
    const Image = req.file ? req.file.filename : null; // Get the uploaded image filename if available

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { Title, Content, Image },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
