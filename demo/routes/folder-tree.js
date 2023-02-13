const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('folder-tree');
});
module.exports = router;