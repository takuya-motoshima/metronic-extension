const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tooltip');
});
module.exports = router;