const express = require('express');
const router = express.Router();
const Blog = require('./blog');

// Create a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  const newBlog = new Blog({ title, content });

  newBlog.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error creating blog post');
    } else {
      res.status(201).send('Blog post created successfully');
    }
  });
});

// Get all blog posts
router.get('/', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving blog posts');
    } else {
      res.json(blogs);
    }
  });
});
// Update a specific blog post by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
  
    Blog.findByIdAndUpdate(id, { title, content }, (err, blog) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error updating blog post');
      } else {
        res.status(200).send('Blog post updated successfully');
      }
    });
  });
  
  // Delete a specific blog post by ID
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
  
    Blog.findByIdAndDelete(id, (err, blog) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error deleting blog post');
      } else {
        res.status(200).send('Blog post deleted successfully');
      }
    });
  });
  
  module.exports = router;
  