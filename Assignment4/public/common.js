/* Created by: Brandon Nishimura 
Purpose: This script is for a global header and footer. It will replace the element called 'main-header' 
and replace whatever is inside it with this.

*/

var header = document.getElementById('main-header');
console.log(header);
header.innerHTML = (`
<div class="header">
        <h1>My Piano Studio</h1>
        <h2><strong>Serving Hawaii Since 2001</strong></h2>
    </div>
    <div align="center">
        <a href="/index.html" class="button1">Home</a>
        <a href="/blog.html" class="button1">Blog</a>
        <a href="/gallery.html" class="button1">Gallery</a>
        <a href="/lessons.html" class="button1">Lessons</a>
        <a href="/testimonials.html" class="button1">Testimonials</a>
        <a href="/events.html" class="button1">Events</a>
        <a href="/aboutus.html" class="button1">About Us</a>
        <a href="/contact.html" class="button1">Contact</a>
    </div>
    <br>
    <div align="right" style="background-color:paleturquoise">
        <a href="/login.html" class="button2">Login</a>
        <a href="/register.html" class="button2">Register</a>
    </div>
    `);

var footer = document.getElementById('main-footer');
console.log(footer);
footer.innerHTML = (`
    <div style="background-color: lightblue" align="left">
        <h2>My Piano Studio</h2>
        <p> 691 Auahi Street
            <br>
            Honolulu, HI 96813

            <br>
            P: (808) 223-9872
            <br>
            F: (808) 322-9908
            <br>
            E: mypianostudio@gmail.com
            <br>
            Operating Hours: 
            <br>
            Monday - Friday: 9:30am - 6:00pm
            Saturday: 8:30am - 7:30pm
            Sunday: Closed 
        </p>`);