var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware'); //will automatically require the index.js

//INDEX ROUTE
router.get('/', function(req, res){
    //Get all campgrounds 
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log("ERROR!");
       }
       else{
           //Then render
           res.render('campgrounds/index', {campgrounds: allCampgrounds});
           
       }
    });
    
});



/* This /campgrounds is a completely different route from the above since its
a post method. The convention is to have same naming due to REST API
*/
//CREATE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res){
    // get data from form and add to campground array
    // redirect back to campground
    var newName = req.body.name;
    var newPrice = req.body.price;
    var newImg = req.body.img;
    var newDesc = req.body.desc;
    //author object that will store whoever the current logged in person is
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //creating a new object that will contain all the necessary details for new campground
    var newObj = {name: newName, price: newPrice, image: newImg, description: newDesc, author: author};
    //create a new campground and save to DB
    Campground.create(newObj, function(err, newlyCreated){
        if(err){
            console.log("ERROR!");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
    
});




// NEW ROUTE - which will show the form
router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('campgrounds/new'); 
});


//SHOW routE
/*This should go second otherwise it will treat the "new" in campground/new 
as a id number, which it isn't
*/
router.get('/:id', function(req, res){
    //find campground with given id, using mongo method findById
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err || !foundCampground){
           req.flash("error", "Campground Not Found!");
           res.redirect('back');
       } 
       else{
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
    
});


//EDIT CAMPGROUND ROUTE - for editing on a form
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in at all, if not redirect
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground Not Found!");
            res.redirect('back');
        }
        else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
        
    });
    
});

//UPDATE CAMPGROUDN ROUTE - form has to submit somewhere which is update
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res){
    //Find and update the correct campgrounds 
    Campground.findOneAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect('/campgrounds');
        }
        //redirect somewhere
        else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//DELETE CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res){
    //Find and delete
    Campground.findOneAndDelete(req.params.id, function(err, deleteCampground){
        if(err){
            res.redirect('/campgrounds');
        }
        else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;