const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('carousel');
});
module.exports = router;