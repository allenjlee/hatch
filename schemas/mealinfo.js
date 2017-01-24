var mongoose = require('mongoose');

var mealinfoSchema= new mongoose.Schema({
    mealName: {type: String, required: true, index: {unique: true}},
    mealDay: {type: Date, required: true},
    mealType: {type: String, required:true},
    mealStyle: {type: String, required:true},
    location: {type: String, required:true},
    img: {type: String, required:true}
});

var mealInfo = mongoose.model('mealInfo', mealinfoSchema);
module.exports = mealInfo;
