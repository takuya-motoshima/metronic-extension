const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('accordion');
});
module.exports = router;