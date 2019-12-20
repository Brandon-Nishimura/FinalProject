// Author: Brandon Nishimura and Kristina Tommee
// Description: this is a server to run our site

// Source: Port Assignment 1 Example + Lab 13 info_server_Ex4.js 
var express = require('express');
var app = express();
var myParser = require("body-parser");
var querystring = require('querystring');
var fs = require('fs'); // require readFileSync;

// Source: Lab 14 exercise 4 
var filename = "user_reg_data.json"; // define file name
var quantityqstring = "";
var loginqstring = "";
var registerqstring = "";
var testimonialname = "testimonial_data.json";

// Source: Lab 14 exercise 4 
// read, parse, output the contents from user_registration_info.json
var raw_data = fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(raw_data);
var testimonial_raw_data = fs.readFileSync(testimonialname, 'utf-8');
var testimonial_data = JSON.parse(testimonial_raw_data);


// Source: Lab 14 exercise 4 
app.use(myParser.urlencoded({ extended: true })); // use myparser 

// Source: Lab 14 exercise 4
// Process login form POST and redirect to invoice page if ok, back to login page if not
app.post("/login.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string
  loginqstring = qstring;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("login.html");
    // redirect back to login page if nothing was submitted 
  } else {
    // user submitted username and password. test them for validity

    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    var usernameqstring = "&user=" + username; // creates query string for username
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      if (POST.password == users_reg_data[usernameLowerCase].password) // the password correctly corresponds to the defined username in the registration data
      {
        response
          .cookie('userID', usernameLowerCase)  // Add a cookie
          .redirect("index.html"); // username and password match the user reg data; send to invoice with quantity and username info stored in query string
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

// Source: Lab 14 Exercise 4 
app.post("/register.html", function (request, response) {
  // process a register form, redirect to invoice page if ok, back to register page if not 
  let POST = request.body; // take body of request and save it in local variable, POST
  var username = POST.username; // store what was typed in the username textbox in the variable username
  var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
  var password = POST.password; // store what was typed in the password textbox in the variable password
  var repeatPassword = POST.repeatPassword; // store what was typed in the repeat password textbox in the variable repeatPassword
  var email = POST.email; // store what was typed in the email textbox in the variable email
  var fullname = POST.fullname; // store what was typed in the fullname textbox in the variable fullname
  var usernameqstring = "&user=" + username; // creates query string for username
  var d = Date();
  a = d.toString();


  is_valid = true; // initializing variable is_valid
  // check if username is valid
  errs_array = usernameValidation(usernameLowerCase, true);
  if (errs_array.length != 0) // there are errors in the username
    is_valid = false; // username is not valid 

  // check if password is valid 
  errs_array = passwordValidation(password, true);
  if (errs_array.length != 0) // there are errors in the password
    is_valid = false; // password is not valid 

  // check if email is valid 
  errs_array = emailValidation(email, true);
  if (errs_array.length != 0) // there are errors in the email
    is_valid = false; // email is not valid 

  // check if fullname is valid
  errs_array = fullnameValidation(fullname, true);
  if (errs_array.length != 0) // there are errors in the full name
    is_valid = false; // full name is not valid 

  // Now check if there were any errors
  if (!is_valid) {
    // there are errors
    qstring = querystring.stringify(POST); // stringify or convert POST (registration info) to a string
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring); // there are errors, send back to the register page with the register info stored in query string
    return;
  }

  if (repeatPassword != password) {
    // repeat password does match password
    qstring = querystring.stringify(POST); // stringify or convert POST (registration info) to a string
    registerqstring = qstring;
    response.redirect("register.html?" + registerqstring); // send back to register page with register info stored in query string
    return;
  }

  if (typeof users_reg_data[usernameLowerCase] == 'undefined') // username doesn't exist in user registration data
  {
    users_reg_data[usernameLowerCase] = {};  // create empty object 
    users_reg_data[usernameLowerCase].username = usernameLowerCase; // store the usernameLowerCase value into users_reg_data file under username
    users_reg_data[usernameLowerCase].password = POST.password; // store the passoword value into users_reg_data file under password
    users_reg_data[usernameLowerCase].full_name = POST.fullname; // store the full name value into users_reg_data file under full name
    users_reg_data[usernameLowerCase].email = POST.email; // store the email value into users_reg_data file under email
    users_reg_data[usernameLowerCase].color = POST.color;
    users_reg_data[usernameLowerCase].registrationDate = a;
    response.cookie('userID', usernameLowerCase) // Add a cookie


    var output_data = JSON.stringify(users_reg_data); // stringify users_reg_data
    fs.writeFileSync(filename, output_data, "utf-8");

    response.redirect("/registrationredirect.html"); // registration information is valid; send to invoice with quantity and username info stored in query string
    return;
  }
  else {
    response.redirect("redirect.html"); // username already taken; send user to redirect.html page 
  }
});

// Source: Lab 13 info_server_Ex4.js
// Source of functions for validation: https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php

// validates to make sure that username meets requirements 
function usernameValidation(usernameLowerCase, return_errors = false) {
  var letters = /^[0-9a-zA-Z]+$/; // allowable characters 
  errors = []; // assume no errors at first
  // check if length is okay; length must be between 4 and 10 characters
  if (usernameLowerCase.length > 10 || usernameLowerCase.length < 4) {
    // username doesn't doesn't meet requirements 
    errors.push('<font color="black">Username must be between 4 and 10 characters long!</font>');
  }
  // check if there are only letters and numbers; check if matches the variable letters
  if (!usernameLowerCase.match(letters)) {
    // if contain characters that are not defined in letters = error 
    errors.push('<font color="black">Username can only contain alphanumeric characters only!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}

// validates password; it should be of length 6 characters or greater.
function passwordValidation(password, return_errors = false) {
  if (password.length < 6) {
    errors.push('<font color="black">Password must be at least 6 characters long!</font>')
  }

  return return_errors ? errors : (errors.length == 0);
}

// validate email format
function emailValidation(email, return_errors = false) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!email.match(mailformat)) {
    // doesn't match email format 
    errors.push('<font color="black">You have entered an invalid email address!</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}
// validate fullname checks whether user name input field is provided with alphabates characters. If not, it displays an alert 
function fullnameValidation(fullName, return_errors = false) {
  var letters = /^[A-Za-z ]+$/;
  if (!fullName.match(letters)) {
    // full name includes character not defined in the variable letters
    errors.push('<font color="black">Username can only contain letters</font>');
  }

  return return_errors ? errors : (errors.length == 0);
}

// Source: Lab 14 Exercise 4 
app.post("/testimonials.html", function (request, response) {
  let POST = request.body; // grab body of request and save it in POST
  qstring = querystring.stringify(POST); // stringify or convert POST (testimonial info) to a string
  testimonialqstring = qstring;
  var testimonial = POST.testimonial;

  if (typeof POST['submit'] == undefined) {
    // check if the submit button was pressed.
    response.redirect("testimonials.html");
    // redirect back to testimonial page if nothing was submitted 
  } else {
    is_valid = true; // initializing variable is_valid

    // check if testimonial is valid
    errs_array = testimonialValidation(testimonial, true);
    if (errs_array.length != 0) // there are errors in the testimonial
      is_valid = false; // testimonial is valid
    if (!is_valid) {
      // there are errors
      qstring = querystring.stringify(POST); // stringify or convert POST (registration info) to a string
      testimonialqstring = qstring;
      response.redirect("/testimonialredirect3.html?" + testimonialqstring); // there are errors, send back to the testimonial page with the testimonial info stored in query string
      return;
    }

    // user submitted testimonial. test if username is an actual username in the user reg data 

    //check if valid username exists
    var username = POST.username; // store what was typed in the username textbox in the variable username
    var usernameLowerCase = username.toLowerCase(); // convert what was typed in the username textbox to all lower case and store in a variable 
    if (users_reg_data[usernameLowerCase] != undefined) // check if username exists in user registration data
    {
      testimonial_data[usernameLowerCase] = {};  // create empty object 
      testimonial_data[usernameLowerCase].username = usernameLowerCase; // store the usernameLowerCase value into testimonial_data.json file under username
      testimonial_data[usernameLowerCase].fullname = POST.fullname; // store the full name value into testimonial_data.json file under full name
      testimonial_data[usernameLowerCase].testimonial = POST.testimonial; // store the testimonial value into testimonial_data.json file under testimonial


      var output_data = JSON.stringify(testimonial_data); // stringify users_reg_data
      fs.writeFileSync(testimonialname, output_data, "utf-8");

      response.redirect("/testimonialredirect1.html"); // testimonial information is valid; show message that submission was successful
      return;
    }
    else {
      // username doesn't exist 
      console.log("username doesn't exist");
    }
    response.redirect("/testimonialredirect2.html?" + testimonialqstring); // send to redirect page along with testimonial info saved in query string
  }
});


// Source: Lab 13 info_server_Ex4.js
// Source of functions for validation: https://www.w3resource.com/javascript/form/javascript-sample-registration-form-validation.php

// validate testimonial textbox 
function testimonialValidation(testimonial, return_errors = false) {
  errors = []; // assume no errors at first
  // check if anything was input into the testimonial textbox
  if (testimonial.length == 0 ){
    // testimonial doesn't doesn't meet requirements 
    errors.push('<font color="black">Username must be greater than 0 characters long!</font>');
  }
  return return_errors ? errors : (errors.length == 0);
}
// Source: Lab 14 exercise 4 
var modifyschedule = "modify_schedule.json"; // define modifyschedule
var testimonialname = "testimonial_data.json";

// function to get username from users reg data
// Source: Lab 14 exercise 4 
// read, parse, output the contents from user_registration_info.json
var modify_raw_data = fs.readFileSync(modifyschedule, 'utf-8');
var modify_data = JSON.parse(modify_raw_data);

// Source: Lab 14 exercise 4 
app.use(myParser.urlencoded({ extended: true })); // use myparser 

app.post("/schedule.html", function (request, response) {
    let POST = request.body; // grab body of request and save it in POST
    qstring = querystring.stringify(POST); // stringify or convert POST (login info) to a string

    if (typeof POST['submit'] == undefined) {
      // check if the submit button was pressed.
      response.redirect("index.html");
      // redirect back to home page if nothing was submitted 
    } else {
      
      var hope = POST.modify; // store what was typed in the modify textbox in the variable hope
      modify_data = {}; 
      modify_data.username = hope; // store the modify value into modify_schedule.json file under username
     

        var output_data = JSON.stringify(modify_data); // stringify users_reg_data
        fs.writeFileSync(modifyschedule, output_data, "utf-8");

        response.redirect("/modifyredirect.html"); // modify information is valid; send successful submission message
        return;

    }});

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));

