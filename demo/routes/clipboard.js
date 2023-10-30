const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('clipboard');
});
module.exports = router;