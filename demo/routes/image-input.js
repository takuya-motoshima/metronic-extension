const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('image-input');
});
module.exports = router;