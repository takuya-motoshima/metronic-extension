const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('modal');
});
module.exports = router;