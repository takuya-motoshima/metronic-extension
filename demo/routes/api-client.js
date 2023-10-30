const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('api-client');
});
module.exports = router;