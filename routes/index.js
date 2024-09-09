var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/recipe', (req, res) => {
  res.render('recipe'); // This will render views/recipe.ejs
});

module.exports = router;
