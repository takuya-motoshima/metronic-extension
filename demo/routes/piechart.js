const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('piechart');
});
module.exports = router;