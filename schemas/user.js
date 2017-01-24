var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({ name: String, username: String, password: String, favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}] });

var User = mongoose.model('User', userSchema);

module.exports = User;