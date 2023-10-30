const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('symbol');
});
module.exports = router;