var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });    

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    //connecting the user to campgrounds, so no more need for typing author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;