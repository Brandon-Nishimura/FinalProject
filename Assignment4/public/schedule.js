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

currentTime = new Date ( );
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






// var nextWeekString =
