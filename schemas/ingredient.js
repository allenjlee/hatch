var mongoose = require('mongoose');


var ingredientSchema = new mongoose.Schema({ name:String });

var Ingredient = mongoose.model('Ingredient', ingredientSchema);

module.exports = Ingredient;
