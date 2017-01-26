var express = require("express"),

	 app = express(),

	 bodyparser = require("body-parser"),

	 mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine","ejs");

// Schema Setup

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Salmon Creek",
// 		image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
// 		description: "This is huge hill. No facilities."
// 	},function(err,campground){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			console.log("Newly Created Campground");
// 			console.log(campground);
// 		}
// 	});

var campgrounds = [
		{name: "Salmon Creek", image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg"},
		{name: "Granite Hill", image: "https://farm5.staticflickr.com/4123/4943676109_b93d9c1203.jpg"},
		{name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3319/3493312828_365d80acb7.jpg" }
	];

app.get("/",function(req,res){
	//res.send("This will be the landing page!");;
	res.render("landing");
});

app.get("/campgrounds",function(req,res){

	//Get All Campgrounds from DB
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds: allCampgrounds});		
		}

	});
	
	
});

app.post("/campgrounds",function(req,res){
	//res.send("You hit the post route");
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	// Create a New Campground
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");		
		}
	});

	//campgrounds.push(newCampground);
	
});

app.get("/campgrounds/new",function(req,res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id",function(req,res){
	//res.send("This will be the show page");
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show",{campground: foundCampground});		
		}

	});
	
});

app.listen(3000,function(){
	console.log("yelpcamp has started!");
});
