const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tables');
});
module.exports = router;