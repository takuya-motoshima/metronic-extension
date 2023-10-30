const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('input-group');
});
module.exports = router;