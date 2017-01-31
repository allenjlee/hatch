var mongoose = require('mongoose');

var mealinfoSchema= new mongoose.Schema({
    mealName: {type: String, required: true, index: {unique: true}},
    mealDay: {type: String},
    mealTime: {type: String},
    location: {type: String},
    description: {type: String},
    createdBy: {type: String},
    capacity: {type: Number},
    attendingUsers: { type : Array , "default" : [] },
    price: {type: String},
    img: {type: String}
});

var mealInfo = mongoose.model('mealInfo', mealinfoSchema);
module.exports = mealInfo;
