const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('dropzone');
});
module.exports = router;