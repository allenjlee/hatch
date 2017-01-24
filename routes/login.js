var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/* Login Page */
router.get('/', function(req, res, next) {	
  res.render('login', { title: 'Hatch: Login' });
});

/*Add User Manually */
router.post('/add', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name= req.body.realName;
	User.find({'username': username},function(err,users){
		if(users.length==0)
		{
			var newUser= new User({ 'name': name, 'username':username , 'password':password });
			newUser.save();
	
			res.redirect('/login/'+username);
		}
		else
		{
			if(password==users[0].password)
			{
				res.redirect('/login/'+username);
			}

			else
			{
				res.render('login',{title: "Login", message: 'Username is Already Taken'});
			}
			
		}


	});
	
});

router.get('/:username', function(req, res, next) {
	var userName=req.params.username;

	User.find({
	'username': userName
}, function(err, users) {
	if(users.length>0)
{
	var loadedRecipes=users[0].favorites;
	var displayRecipes=[];
	for(var i=0; i<loadedRecipes.length; i++)
	{
		Ingredient.find({'_id': loadedRecipes[i]},function(err,ingredients){
		if(ingredients.length>0)
		{
			
			displayRecipes.push(ingredients[0].name);
			
		}
		
		});
	}
	res.render('profile', { title: userName, FavoriteRecipes: displayRecipes }    );
}
else
{
res.render('error',{title: 'User Not Found'});
}


});

});


router.post('/addRecipe', function(req, res, next) {
	var userName=req.body.username;
	var Recipe= req.body.Recipe;
	console.log('Recipe');
	User.find({'username': userName}, function(err,users) {
		if(users.length>0)
	{
		var current=users[0];
		var toAdd=new Ingredient({name: Recipe});
		toAdd.save();
		current.favorites.push(toAdd);
		current.save();
	}
	});

	res.redirect('/login/'+userName);
});



module.exports = router;