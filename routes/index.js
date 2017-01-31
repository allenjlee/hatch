var Ingredient= require('../schemas/ingredient');
var express = require('express');
var router = express.Router();
var mealInfo = require('../schemas/mealinfo');
var User=require('../schemas/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hatch: Hang out. Meet. Eat.', isLoggedIn: false });
});



router.get('/edit:username', function(req, res, next) {
  var username=req.params.username;
  User.find({'username':username}, function(err, users){
    res.render('edit', {users, 'username': username});
  });
});



router.get('/page:username', function(req, res, next) {
	var userName=req.params.username;
  User.find({'username':userName} , function(err, users){
    if(users.length>0)
    {
      res.render('index', { title: 'Hatch: Hang out. Meet. Eat.', currentUser: userName, isLoggedIn: true});
    }
    else
    {
      res.render('index', { title: 'Hatch: Hang out. Meet. Eat.', isLoggedIn: false });
    }
  });
	
  
});



router.get('/info/:username', function(req,res,next){
  var username= req.params.username;
  User.find({'username': username}, function(err,users){
    if(users.length>0)
    {
      var rating=0;
      var name=users[0].name;
      var l=users[0].ratings;
      var img=users[0].proPic;
      var bio=users[0].favorites;
      for(var i=0; i<l.length; i++)
      {
          rating+=l[i];
      }
      rating = parseFloat(rating/l.length).toFixed(2);
      mealInfo.find({'createdBy': username}, function (err, mealinfos)
      {
        res.render('userInfo', {'rating': rating, 'name': name, 'img': img, 'bio': bio, 'mealinfos1': mealinfos } )
      });
      
    }
  });

});

/* Ingredients List */
router.get('/ingredientslist', function(req, res, next) {
  
  Ingredient.find({}, function(err, ingredients) {
    res.send(ingredients);
  });
});

router.get('/browse', function(req,res,next){
  mealInfo.find({}, function(err, mealinfos){
    var reverse=[];
    var l=mealinfos.length;
    for(var i=0; i<l; i++)
    {
      reverse.push(mealinfos[l-1-i]);
    }
	   res.render('browse', {mealinfos: reverse, title: "Hatch: Browse For Food"})
  }); 
});


router.get('/browse:username', function(req,res,next){
	var userName=req.params.username;
  mealInfo.find({}, function(err, mealinfos){
    var reverse=[];
    var l=mealinfos.length;
    for(var i=0; i<l; i++)
    {
      reverse.push(mealinfos[l-1-i]);
    }
    res.render('browse', {mealinfos: reverse, title: "Hatch: Browse For Food", currentUser:userName});
  });  
});

router.get('/register', function(req,res,next){
  res.render('register', {title: "Hatch: Create An Account"})
});


router.get('/browse:username/:location',function(req,res,next){
    var location=req.params.location;
    if(location=="All")
    {
      res.redirect('/browse'+req.params.username);
    }
    else
    {
      var index=parseInt(location)-1;
    console.log(index);
    var userName=req.params.username;
    var dorms=["Maseeh Hall", "McCormick Hall", "Burton-Conner House", "Next House", "Baker House", "Simmons Hall", "MacGregor House", "East Campus", "New House", "Random Hall"];
    mealInfo.find({'location':dorms[index]}, function(err, mealinfos){
    var reverse=[];
    var l=mealinfos.length;
    for(var i=0; i<l; i++)
    {
      reverse.push(mealinfos[l-1-i]);
    }
    res.render('browse', {mealinfos: reverse, title: "Hatch: Browse For Food", currentUser:userName});
  });  
    }
    
});

module.exports = router;
