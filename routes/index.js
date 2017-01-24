var Ingredient= require('../schemas/ingredient');
var express = require('express');
var router = express.Router();
var mealInfo = require('../schemas/mealinfo');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hatch: Hang out. Meet. Eat.', isLoggedIn: false });
});




router.get('/page:username', function(req, res, next) {
	var userName=req.params.username;
	res.render('index', { title: 'Hatch: Hang out. Meet. Eat.', currentUser: userName, isLoggedIn: true});
  
});





/* Ingredients List */
router.get('/ingredientslist', function(req, res, next) {
  
  Ingredient.find({}, function(err, ingredients) {
    res.send(ingredients);
  });
});

router.get('/browse', function(req,res,next){
  mealInfo.find({}, function(err, mealinfos){
	   res.render('browse', {mealinfos: mealinfos, title: "Hatch: Browse For Food"})
  }); 
});


router.get('/browse:username', function(req,res,next){
	var userName=req.params.username;
  mealInfo.find({}, function(err, mealinfos){
    res.render('browse', {mealinfos: mealinfos, title: "Hatch: Browse For Food", currentUser:userName});
  });  
});

router.get('/register', function(req,res,next){
  res.render('register', {title: "Hatch: Create An Account"})
});

module.exports = router;
