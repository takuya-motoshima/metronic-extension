const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('date-range-picker');
});
module.exports = router;