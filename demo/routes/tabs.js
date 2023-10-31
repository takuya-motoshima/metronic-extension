const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tabs');
});
module.exports = router;