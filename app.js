var express     = require('express'),
    app         = express(),
    mongoose    = require('mongoose'),
    flash       = require('connect-flash'),
    passport    = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    Campground  = require('./models/campground'),
    Comment     = require('./models/comment'),
    User        = require('./models/user'),
    seedDB      = require('./seeds');
    
var commentRoutes   = require('./routes/comments'),
    campgRoutes     = require('./routes/campground'),
    indexRoutes      = require('./routes/index');


//the useNewUrlParser removes the deprecating warning signs
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });    
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//Seed the database with initial data
//seedDB();


//=======================
// PASSPORT CONFIGS
//=======================
app.use(require('express-session')({
    secret: "Beast Mode",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//The .authenticate() method came with the passport local mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//lets the app use the user name for every route instead of hardcoding in each route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp Camp Started!");
});