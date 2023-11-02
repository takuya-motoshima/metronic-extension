const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('separator');
});
module.exports = router;