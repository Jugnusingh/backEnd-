// const express = require("express")
// const router = express.Router()
// const Product = require("../../schema/product")
// const upload = require('../../multer/multer')

// console.log(upload.fields(),"hariom")
// // Define a route for handling the file uploads
// router.post('/', upload.fields([
//     { name: 'image', maxCount: 1 },
//     { name: 'pdf', maxCount: 1 }
//   ]), async (req, res) => {
//     try {
//         console.log(req,"body")
//       const { title, price, description, category } = req.body;
      
//       const image = req.files
//     console.log(image,'image hai ')
//     //   const pdf = req.files['pdf'][0].filename;
  
//     //   // Save the product data to the database
//     //   const product = new Product({
//     //     title,
//     //     price,
//     //     description,
//     //     category,
//     //     image: `/uploads/${image}`,
//     //     pdf: `/uploads/${pdf}`
//     //   });
//     //   await product.save();
  
//     //   res.status(201).json({ message: 'Product created successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
//   module.exports = router;
  