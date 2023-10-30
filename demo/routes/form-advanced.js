const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('form-advanced');
});
module.exports = router;