var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });    

// SCHEMA SETUP
var commentSchema = new mongoose.Schema({
    text: String,
    //connecting the user to comments, so no more need for typing author
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;