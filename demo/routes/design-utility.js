const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('design-utility');
});
module.exports = router;