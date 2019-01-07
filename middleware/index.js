// all middleware goes here
var Campground = require('../models/campground');
var Comment = require('../models/comment');


var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            //Does user own campground
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not Found!");
                res.redirect('back');
            }
            
            
            else {
                //if user is logged in, does user own campground
                //understand that foundCampground.auther.id is an object and req.user._id is a string
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect('back');
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be Logged In to do that!");
        res.send("YOU're NOT LOGGED IN DAMMIT");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
            //Does user own campground
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found!");
                res.redirect('back');
            }
            
            else {
                //if user is logged in, does user own comment
                //understand that foundComment.auther.id is an object and req.user._id is a string
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else {
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.send("YOU're NOT LOGGED IN DAMMIT");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    //middleware to see if users are logged in and to disable certain functions
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to Login first!"); //gives us a way to access this request
    res.redirect('/login');
};

module.exports = middlewareObj;