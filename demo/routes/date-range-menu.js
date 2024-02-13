const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('date-range-menu');
});
module.exports = router;