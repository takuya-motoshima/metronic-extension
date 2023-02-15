const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.render('rest-client');
});
module.exports = router;