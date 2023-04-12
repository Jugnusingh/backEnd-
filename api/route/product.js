// const express = require('express');
// const router = express.Router();

// const Product = require('../../schema/product');

// router.post('/products', upload.fields([
//   { name: 'image', maxCount: 1 },
//   { name: 'pdf', maxCount: 1 }
// ]), async function(req, res) {
//   const { title, price, description, category } = req.body;
//   const image = req.files['image'][0];
//   const pdf = req.files['pdf'][0];

//   const product = new Product({
//     title,
//     price,
//     description,
//     category,
//     image: {
//       filename: image.filename,
//       path: image.path,
//       mimetype: image.mimetype
//     },
//     pdf: {
//       filename: pdf.filename,
//       path: pdf.path,
//       mimetype: pdf.mimetype
//     }
//   });

//   try {
//     await product.save();
//     res.send('Product created successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// });

// module.exports = router;
