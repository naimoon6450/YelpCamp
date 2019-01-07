var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });    


// SCHEMA SETUP
var userSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Adds methods from the passport to the User
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports = User;