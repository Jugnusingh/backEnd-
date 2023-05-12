const express = require('express');
const router = express.Router();
const Category = require('../../schema/categorySchema');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single category
router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

// POST a new category
router.post('/', async (req, res) => {
  const category = new Category({
    category: req.body.category
  });
  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT (update) a category
router.put('/:id', getCategory, async (req, res) => {
  if (req.body.category != null) {
    res.category.category = req.body.category;
  }
  try {
    const updatedCategory = await res.category.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a category
router.delete('/:id', getCategory, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// middleware function to get a single category by ID
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.category = category;
  next();
}

module.exports = router;
