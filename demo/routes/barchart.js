const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('barchart');
});
module.exports = router;