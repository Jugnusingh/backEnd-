const express = require("express");
const router = express.Router();
const Product = require("../../schema/productSchema");
const upload = require("../../multer/multer");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      productData: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});



router.post("/", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
  const { Title, Description, Price, Category } = req.body;

  const product = new Product({
    Title,
    Description,
    Price,
    Category,
    Image: req.files['image'][0].filename,
    Pdf: req.files['pdf'][0].filename,
  });

  
    product.save()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          newProduct: result,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: "Failed to save product",
        });
      });
  });
  

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  
  Product.findByIdAndRemove(productId)
    .then(() => {
      res.status(200).json({
        message: 'Product deleted successfully',
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Failed to delete product",
      });
    });
});

module.exports = router;
