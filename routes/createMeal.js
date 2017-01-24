var express = require('express');
var router = express.Router();
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
	var mealType = req.body.mealType;
    var mealStyle = req.body.mealStyle;
    var location = req.body.location;
	var img_url = "https://hatchblob.blob.core.windows.net/meal-pictures/" + blob_name;

	var newmealInfo = new mealInfo({
    	'mealName': mealName,
		'mealDay': mealDay,
    	'mealType': mealType,
    	'mealStyle': mealStyle,
    	'location': location,
		'img': img_url
    });
	newmealInfo.save(function(err, data) {
		if (err) {
			console.log("ERROR: ", err);
		}
		res.send('/browse');
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

/*
router.post('/addMeal', function(req,res,next){
	var mealName = req.body.mealName;
    var mealDay = req.body.mealDay;
    var mealType = req.body.mealType;
    var mealStyle = req.body.mealStyle;
    var location = req.body.location;

	console.log(mealName);
	console.log(mealDay);

    var newmealInfo = new mealInfo({
    	'mealName': mealName,
    	'mealDay': mealDay,
    	'mealType': mealType,
    	'mealStyle': mealStyle,
    	'location': location
    });
	newmealInfo.save(function(err, data) {
		if (err) {
			console.log("ERROR: ", err);
		}
		res.send('/browse');
	});
});
*/
module.exports = router;

