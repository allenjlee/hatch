var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var Ingredient=require('../schemas/ingredient');
var mealInfo = require('../schemas/mealinfo');
var multer = require('multer');
var azure = require('azure-storage');
var fs = require('fs');
var nconf = require('nconf');
var string_hash = require('string-hash');


//load env variables for azure blob
nconf.env().file({ file: 'config.json', search: true });
var azureAccount = nconf.get("AZURE_STORAGE_ACCOUNT");
var azureKey = nconf.get("AZURE_STORAGE_ACCESS_KEY");

//connect to azure blob storage for hatch files

var blobSvc = azure.createBlobService(azureAccount, azureKey);

var storage = multer.diskStorage({

});
var multer_get_started = multer({storage: storage}).single('profile_pic'); 



router.post('/changePassword', function(req,res,next){
	var username=req.body.username;
	var password=req.body.new;
	User.find({'username': username}, function(err, users){
		if(users.length>0)
		{
			users[0].password=password;
			users[0].save();
			res.redirect('/login/'+username);
		}

	});


});






router.post('/editProfile',  multer_get_started, function(req,res,next){
	var username=req.body.username;
	var blob_name='blob' + string_hash(username+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20));
	
	var propic=req.file;
	
	blobSvc.createBlockBlobFromLocalFile('profile-pictures', blob_name, propic.path, function(error, result, response){
		console.log("broken");
		if(!error){
			console.log("file uploaded");
		}
	});
	var img_url = "https://hatchblob.blob.core.windows.net/profile-pictures/" + blob_name;
	var username=req.body.username;
	User.find({'username':username}, function(err,users){
		if(users.length>0)
		{
			users[0].proPic=img_url;
			users[0].save();
		}
	});
	res.send('/login/'+username);
});



/* Login Page */
router.get('/', function(req, res, next) {	
  res.render('login', { title: 'Hatch: Login' });
});

/*Add User Manually */
router.post('/add', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var name= req.body.name;
  console.log(username);
	User.find({'username': username},function(err,users){
		if(users.length==0)
		{
			var newUser= new User({ 'name': name, 'username':username , 'password':password, 'proPic': "http://img02.deviantart.net/5f01/i/2010/023/1/8/blank_paper_by_montroytana.jpg" });
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

	var proPic=users[0].proPic;
	var loadedRecipes=users[0].favorites;
	var attending=users[0].mealsAttending;
	var toDisplay=[];
	var profileName = users[0].name;
	var rating=0;
	var l=users[0].ratings;
	for(var i=0; i<l.length; i++)
	{
		rating+=l[i];
	}
	rating = parseFloat(rating/l.length).toFixed(2);



	for(var i=0; i<attending.length; i++)
	{
		mealInfo.find({'_id': attending[i]},function(err,mealinfos){
		if(mealinfos.length>0)
		{
			
			toDisplay.push(mealinfos[0]);
			
		}
		
		});
	}
	mealInfo.find({'createdBy': userName}, function(err, mealinfos){
	   res.render('profile', {name: profileName, proPic: proPic, title: userName, mealinfos1:mealinfos, mealinfos2:toDisplay,  Bio: loadedRecipes, rating: rating }    );
  	}); 
	
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
	console.log(userName);
	User.find({'username': userName}, function(err,users) {
		if(users.length>0)
	{
		var current=users[0];
		current.favorites=Recipe;
		current.save();
	}
	});

	res.redirect('/login/'+userName);
});






module.exports = router;