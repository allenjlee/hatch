var express = require('express');
var router = express.Router();
var mealInfo = require('../schemas/mealinfo');
var User = require('../schemas/user');
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
var multer_get_started = multer({storage: storage}).single('meal_pic');





router.post('/addMeal', multer_get_started, function(req,res,next){




	var mealpic = req.file;
	var blob_name = 'blob' + string_hash(req.body.mealName);
	console.log(mealpic + "problems");
	blobSvc.createBlockBlobFromLocalFile('meal-pictures', blob_name, mealpic.path, function(error, result, response){
		console.log("broken");
		if(!error){
			console.log("file uploaded");
		}
	});
	//console.log("Try");
	var mealName = req.body.mealName;
	var mealDay = req.body.mealDay;
	var mealTime = req.body.mealTime;
    var location = req.body.location;
	var description = req.body.description;
	var username=req.body.username;
	var price = req.body.price;
	var img_url = "https://hatchblob.blob.core.windows.net/meal-pictures/" + blob_name;
	var capacity=req.body.capacity;
	var newmealInfo = new mealInfo({
    	'mealName': mealName,
		'mealDay': mealDay,
    	'mealTime': mealTime,
    	'location': location,
		'description': description,
		'createdBy': username,
		'attendingUsers':[],
		'price':price,
		'capacity': capacity,
		'img': img_url
    });
	newmealInfo.save(function(err, data) {
		if (err) {
			console.log("ERROR: ", err);
		}
		res.send('/browse'+username);
	});
});

/* default create meal */
router.get('/', function(req,res,next){
	res.render('createMeal', {title: 'Hatch: Create A Meal'})
});

/* Meal List */
router.get('/mealList', function(req,res,next){
	mealInfo.find({}, function(err, mealinfos){
		res.send(mealinfos);
	});
});


router.post('/att:mealName',function(req,res,next){
	var mealName=req.params.mealName;
	var username=req.body.username;
	mealInfo.find({'_id':mealName}, function(err, mealinfos)
	{
		if(mealinfos.length>0)
		{
			var current=mealinfos[0];

			current.attendingUsers.push(username);
			current.save();
			User.find({'username':username}, function (err,users)
			{
				if(users.length>0)
				{
					users[0].mealsAttending.push(current);
					users[0].save();

				}
			});
			res.redirect('/browse'+username);

		}
		
	});
});



router.post('/remove', function(req,res,next){
	var id=req.body.id;
	mealInfo.remove({"_id": id}, function(err,result){
		if(err)
		{
			console.log("error");
		}
		res.redirect('/');
	});
});


router.get('/:id',function(req,res,next){
	var id=req.params.id;
	mealInfo.find({'_id':id}, function(err, mealinfos)
	{
		
		User.find({'username': mealinfos[0].createdBy},function(err,users){
			if(users.length>0)
			{
				var createdUser=users[0].username;
				var creator=users[0].name;
				var mealName= mealinfos[0].mealName;
				var mealDay= mealinfos[0].mealDay;
				var mealTime= mealinfos[0].mealTime;
				var location= mealinfos[0].location;
				var description=mealinfos[0].description;
				var price = mealinfos[0].price;
				var img=mealinfos[0].img;
				var capacity=mealinfos[0].capacity;
				var count=capacity-mealinfos[0].attendingUsers.length;
				var id=mealinfos[0]._id;

				res.render('mealinfo',{'mealName': mealName, 'img':img, 'description':description, 'location': location, '_id':id, 
				'mealTime': mealTime, 'mealDay': mealDay, 'price': price, 'mealName': mealName, 'creator': creator, 
				'img': img, 'count':count, 'createdUser': createdUser, 'capacity': capacity});
			}
			
		});
		
	});
	
});


router.post('/:username/:id', function(req,res,next){
	username=req.params.username;
	rating=req.body.rating;
	id=req.params.id;
	console.log(rating);
	User.find({'username':username}, function(err, users){
		if(users.length>0)
		{
			users[0].ratings.push(rating);
			users[0].save();
		}

	});
	res.redirect('/createMeal/'+id);
});
module.exports = router;

