var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({ 
	name: String, 
	username: String, 
	password: String, 
	favorites: String, 
	ratings: [{type: Number}], 
	mealsHosted: [{type: mongoose.Schema.Types.ObjectId, ref: 'mealInfo'}], 
	mealsAttending: [{type: mongoose.Schema.Types.ObjectId, ref: 'mealInfo'}],
	proPic: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;
