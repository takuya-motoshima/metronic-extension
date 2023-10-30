const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('bootstrap-icons');
});
module.exports = router;