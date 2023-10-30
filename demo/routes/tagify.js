const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('tagify');
});
module.exports = router;