//Error driven development

var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
    {   name: "Clouds Rest",
        image: "https://farm5.staticflickr.com/4035/4356640874_91317cf73c.jpg",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {   name: "Clouds Rest 2",
        image: "https://farm3.staticflickr.com/2444/3946321012_0dc24c9bcd.jpg",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {   name: "Clouds Rest 3",
        image: "https://farm9.staticflickr.com/8320/8040882556_2584c1c0ca.jpg",
        description: "orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    }
]


function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log("Error");
        }
        console.log("removed all");
        //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campGround){
        //         if(err){
        //             console.log("error");
        //         }
        //         else{
        //             console.log(data);
        //             //Create a comment
        //             Comment.create({
        //                 text: "This place is great, I wish I was there",
        //                 author: "Homie"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log("Error");
        //                 }
        //                 else{
        //                     campGround.comments.push(comment);
        //                     campGround.save();
        //                     console.log("Created New Comment");
        //                 }
        //             })
        //         }
        //     })
        // })
    });
    
    
};

module.exports = seedDB;