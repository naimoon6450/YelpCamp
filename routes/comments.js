var express = require('express');
var router = express.Router({mergeParams: true}); //no idea what mergeParams is doing?
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

// ===========================
// COMMENTS ROUTES
// ===========================

router.get('/new', middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err || !campground){
            req.flash("error", "Campground not Found")
            res.redirect("/campgrounds")
        }
        else{
            res.render('comments/new', { campground: campground } );
        }
    });
    
});

router.post('/', middleware.isLoggedIn, function(req, res){
    //Lookup campground using id
    Campground.findById(req.params.id, function(err, campGround){
        if(err || !campGround){
            req.flash("error", "Campground not Found");
            res.redirect("/campgrounds");
        }
        else{
            //Create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("error");
                }
                else{
                    //add username and id to comment and then save
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    //Connect new comment to campground
                    campGround.comments.push(comment);
                    campGround.save();
                    req.flash("success", "Successfully added Comment!");
                    //Redirect to show page of campgrounds
                    res.redirect('/campgrounds/' + campGround._id);
                }
            });
        }
    });
    
});


// EDIT COMMENTS ROUTE - edit from form
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    //Take into account if the user changes the campground ID while submitting a new comment
    Campground.findById(req.params.id, function(err, campGround){
        if(err || !campGround){
            req.flash("error", "Campground can't be found");
            res.redirect("/campgrounds");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect('back');
            }
            else{
                res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});    
            }
        });
    });
});


// UPDATE COMMENTS ROUTE - post on page
/*
    This wasn't working for a bit, then I dropped the database and restarted and now it updates
    Most likely had to do with schema changes and making updates to wrong items?
*/
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findOneAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        }
        //redirect somewhere
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DELETE COMMENT
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
    //Find and delete
    Comment.findOneAndDelete(req.params.id, function(err, deleteComment){
        if(err){
            res.redirect('back');
        }
        else {
            req.flash("success", "Comment has been deleted!");
            res.redirect('/campgrounds/' + req.params.id); // this is campground id not comment id
        }
    });
});


module.exports = router;

