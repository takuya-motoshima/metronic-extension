const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('tagify');
});
module.exports = router;