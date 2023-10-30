const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('buttons');
});
module.exports = router;