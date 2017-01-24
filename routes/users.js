var express = require('express');
var router = express.Router();
var User = require('../schemas/user');

/* GET users listing. */
router.get('/', function(req, res, next) {

 User.find({}, function(err, users) {
    res.send(users);

});
});





module.exports = router;
