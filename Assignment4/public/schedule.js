/* Created by Brandon Nishimura
Purpose: Create the schedule page!*/

/* var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');
var qs = require('querystring');
app.use(myParser.urlencoded({ extended: true })); */

// Start by editing the cookie so that we can use it for the username.

console.log(document.cookie);
var userOnly = document.cookie.substr(7); // Removes the first seven letters (aka userID=)
console.log(userOnly);

// Then, we pull the information we need!

// Test example day.

// Hardcode test variables
var userAday = "friday"
var userAstart = "#e66465"

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

var calcdays2 = (userLessonDay - currentDayNum);
console.log("calcdays2: " + calcdays);

// A numerical solver to ensure there is no zero / negative for the following string

if (calcdays == 0) {
    var nextLessonString = "Your next lesson is today!"
} else if (calcdays == 1) {
    var nextLessonString = "Your next lesson is tomorrow!"
} else if (calcdays <= -1) {
    nextLessonNum = calcdays + 8
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
} else {
    nextLessonNum = calcdays; 
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
}

// What will appear on the document: "Your next lesson is in __ days!" But we have exceptions for grammar and functional purposes. 

console.log(nextLessonString);

// Create the welcome line!

/* Generate the next two dates for lessons! This uses operations  
to add the new days, then uses a command to turn that new day into a date,
then turns that into a string and edits it to clean it up! */

var nextNextLesson = calcdays+7;
var newDt = new Date();
newDt.setDate(newDt.getDate() + nextNextLesson);
var oneWeekString = ("Your following lesson is on: " + newDt);   
var oneWeekSlice = oneWeekString.slice(0, 44);
console.log(oneWeekSlice);    
