const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('select-elements');
});
module.exports = router;