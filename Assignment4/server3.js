/* Author: Brandon Nishimura
Purpose: Serve as the server for our studio website.*/

var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');
var qs = require('querystring');
app.use(myParser.urlencoded({ extended: true }));
var filename = "user_reg_data.json";

// Only open the file if it can be found. Otherwise, say it can't be.

if (fs.existsSync(filename)) {
  var raw_data = fs.readFileSync(filename, 'utf-8');
  var users_reg_data = JSON.parse(raw_data);
  console.log(user_registration_info);
}
else {
    console.log('File ' + filename + " doesnt exist!");
}

// Creating the variables for our login and register processing.
var loginqstring = "";
var registerqstring = "";

// Process login form POST and redirect to invoice page if ok, back to login page if not
app.post("/login.html", function (request, response) {
    let POST = request.body; // grab body of request and save it in POST
    qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
    loginqstring = qstring; 
    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username; // creates query string for username
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response.redirect("index.html" + quantityqstring + usernameqstring); // username and password match the user reg data; send to invoice with quantity and username info stored in query string
        return;
      }
      else { 
        // username exists in user registration data but password is incorrect

        response.redirect("loginredirect2.html?" + loginqstring); // send to a redirect page along with username info saved in query string
        return;
      }
    } else {
      // username doesn't exist 
      console.log("username doesn't exist");
    }
    response.redirect("loginredirect1.html?" + loginqstring); // send to redirect page along with username info saved in query string
  }
});