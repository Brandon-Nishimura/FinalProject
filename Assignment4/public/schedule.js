/* Created by Brandon Nishimura
Purpose: Create the schedule page!*/

var userAday = "friday"
console.log(userAday)

// Pull the current time so it can be used for our calculations

currentTime = new Date ( );
console.log(currentTime);

var currentDayNum = currentTime.getDay();
console.log(currentDayNum);
  
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

console.log(userLessonDay)

var stepA = (userLessonDay - currentDayNum);
console.log(stepA);

// A numerical solver to ensure there is no zero / negative for the following string

if (stepA == 0) {
    var nextLessonString = "Your next lesson is today!"
} else if (stepA == 1) {
    var nextLessonString = "Your next lesson is tomorrow!"
} else if (stepA <= -1) {
    nextLessonNum = stepA + 7
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
} else {
    nextLessonNum = stepA; 
    var nextLessonString = "Your next lesson is in " + nextLessonNum + " days!";
}
console.log(nextLessonString);

/*What day is the clock showing? Let's convert that to a string we can use. 
if (currentDayNum == 0) {
    currentDay = "Sun"
} elseif (currentDayNum == 1 ) ;{
    currentDay = "Mon"
}

*/



/* currentDay = ( currentDayNum == 0 ) ? "Sun" : currentDayNum;
currentDay = ( currentDayNum == 1 ) ? "Mon" : currentDayNum;
currentDay = ( currentDayNum == 2 ) ? "Tue" : currentDayNum;
currentDay = ( currentDayNum == 3 ) ? "Wed" : currentDayNum;
currentDay = ( currentDayNum == 4 ) ? "Thu" : currentDayNum;
currentDay = ( currentDayNum == 5 ) ? "Fri" : currentDayNum;
currentDay = ( currentDayNum == 6 ) ? "Sat" : currentDayNum; */ 


