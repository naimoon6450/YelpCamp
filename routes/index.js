var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//=======================
// ROUTE CONFIGS
//=======================

router.get('/', function(req, res){
   res.render('landing'); 
});


// ===========================
// AUTH ROUTES
// ===========================
// show register form route
router.get('/register', function(req, res){
    if(req.user){
        req.flash("error", "You are already logged in, you cannot register.");
        res.redirect("back");
    }
    else {
        res.render('register'); 
    }
});

// sign-up logic route
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    //the .register() method stores the crazy hash instead of the password
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message); 
            // err is coming from passport functions, and is an object containing name and message
            res.render('register');
        }

        //if the registration goes according to plan, then authenticate
        //since this is being inputted into the DB for auth to take place
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        })
    });
    
});

// show login form route
router.get('/login', function(req, res){
    
   res.render('login', {message: req.flash("error")}); 
});

// login logic route, understand middleware
router.post('/login', passport.authenticate("local", 
    {
        //this will authenticate if the user exists in db
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});


// logout ROUTE
router.get('/logout', function(req, res){
   req.logout();
   req.flash("success", "Logged You Out!");
   res.redirect('/campgrounds');
});


//middleware to see if users are logged in and to disable certain functions
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;