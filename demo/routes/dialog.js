const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('dialog');
});
module.exports = router;