const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('rating');
});
module.exports = router;