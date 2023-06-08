const express = require('express');
const router = express.Router();
const path = require('path');

// Endpoint for downloading the PDF
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if the product is purchased and validate the user's authorization

    // Get the file path for the PDF based on the productId
    const filePath = path.join(__dirname, `../path/to/pdfs/${productId}.pdf`);

    // Set the appropriate headers for the download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=product.pdf');

    // Stream the file to the response
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to download PDF' });
  }
});

module.exports = router;
