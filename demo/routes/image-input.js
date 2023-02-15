const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('image-input');
});
module.exports = router;