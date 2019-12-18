/* Created by Brandon Nishimura
Purpose: Create the schedule page!*/

console.log(document.cookie);
var userOnly = document.cookie.substr(7); // Removes the first seven letters (aka userID=)
console.log(userOnly);



// Next Lesson String creation!

// Test example day.


// Hardcode test variables
var userAday = "friday"
var userAcolor = "#e66465"

console.log("userAday: " + userAday)

// Pull the current time so it can be used for our calculations

currentTime = new Date ();
console.log("currentTime: " + currentTime);

var currentDayNum = currentTime.getDay();
console.log("currentDayNum: " + currentDayNum);
  
// Convert the user's lesson day into a number

if (userAday == "sunday") {
    userLessonDay = 0
} else if (userAday == "monday") {
    userLessonDay = 1
} else if (userAday == "tuesday") {
    userLessonDay = 2
} else if (userAday == "wednesday") {
    userLessonDay = 3
} else if (userAday == "thursday") {
    userLessonDay = 4
} else if (userAday == "friday") {
    userLessonDay = 5
} else if (userAday == "saturday") {
    userLessonDay = 6
}

console.log("userLessonDay: " + userLessonDay)

// Calculate the days left before the next lesson

var calcdays = (userLessonDay - currentDayNum);
console.log("calcdays: " + calcdays);

// A numerical solver to ensure there is no zero / negative for the following string

if (calcdays == 0) {
    var nextLessonString = "Your next lesson is today!"
} else if (calcdays == 1) {
    var nextLessonString = "Your next lesson is tomorrow!"
} else if (calcdays <= -1) {
    nextLessonNum = calcdays + 7
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
} else {
    nextLessonNum = calcdays; 
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
}

// What will appear on the document: "Your next lesson is in __ days!" But we have exceptions for grammar and functional purposes. 

console.log(nextLessonString);

// Create the welcome line!

// Generate the next four days!

var nextNextLesson = calcdays+7;
var newDt = new Date();
newDt.setDate(newDt.getDate() + nextNextLesson);
var oneWeekString = ("Your next lesson is on: " + newDt);   
var oneWeekSlice = oneWeekString.slice(0, 39);
console.log(oneWeekSlice);    

var nextNextNextLesson = calcdays+8;
newDt.setDate(newDt.getDate() + nextNextNextLesson);
var twoWeekString = ("After that, your lesson is on: " + newDt);   
var twoWeekSlice = twoWeekString.slice(0, 46);
console.log(twoWeekSlice);    

// var nextWeekString =


// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js 
var express = require('express');
var app = express();
var myParser = require("body-parser");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;

// Source: Lab 14 exercise 4 
var modifyschedule = "modify_schedule.json"; // define modifyschedule
var testimonialname = "testimonial_data.json";

// Source: Lab 14 exercise 4 
// read, parse, output the contents from user_registration_info.json
var modify_raw_data = fs.readFileSync(modifyschedule, 'utf-8');
var modify_data = JSON.parse(modify_raw_data);

// Source: Lab 14 exercise 4 
app.use(myParser.urlencoded({ extended: true })); // use myparser 

app.post("/schedule2.html", function (request, response) {
    let POST = request.body; // grab body of request and save it in POST
    qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
    testimonialqstring = qstring;
    var modify = POST.modifySchedule;
  
    if (typeof POST['submit'] == undefined) {
      // check if the submit button was pressed.
      response.redirect("testimonials.html");
      // redirect back to testimonial page if nothing was submitted 
    } else {
      //check if valid username exists
      var hope = POST.modify; // store what was typed in the username textbox in the variable username
      modify_data[appointment] = {}; 
      modify_data[appointment].username = hope; 
     // convert what was typed in the username textbox to all lower case and store in a variable 
  
        var output_data = JSON.stringify(modify_data); // stringify users_reg_data
        fs.writeFileSync(modifyschedule, output_data, "utf-8");
  
        response.redirect("/testimonialredirect1.html"); // registration information is valid; send to invoice with quantity and username info stored in query string
        return;
    
    }});

