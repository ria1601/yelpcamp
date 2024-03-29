var express         = require("express"),
	app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
	flash			= require("connect-flash"),
	passport	    = require("passport"),
	LocalStrategy   = require("passport-local"),
	methodOverride  = require("method-override"),
	Campground      = require("./models/campground"),
	Comment		    = require("./models/comment"),
	User		    = require("./models/user"),
	seedDB		    = require("./seeds")
    
// requiring routes
var commentRoutes 		= require("./routes/comments"),
    campgroundRoutes	= require("./routes/campgrounds"),
	indexRoutes			= require("./routes/index")

	
//mongoose.connect(dbUrl, {useNewUrlParser: true});
mongoose.connect("...............", {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
	useFindAndModify: false
});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB(); //seed the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "SECRETTT",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

 app.listen(3000, function(req,res){ 
   console.log(" The Yelpcamp server has started!");
});                