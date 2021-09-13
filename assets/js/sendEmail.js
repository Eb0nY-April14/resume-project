//function sendMail() {  // Here, the form created in our contact.html file is passed into the sendMail() function as a parameter with the name "contactForm"
    //emailjs.send("gmail", "christiana", { // We then call on the emailjs.send() method  pass in 2 parameters which are 'gmail' for the service ID & 'christiana' for the template ID
        /* The keys for these objects in quotes below should be same as the parameter names that we've set in our email template 
        on Emailjs while the key values here (i.e names) should be same as the names we gave these fields in our contact.html form.  */
        /*"from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value, */
   // })
    /* We supply the 'then()' method for our promise & provide a function within it that takes 'response' as the parameter. */
    /* If sending the email has been a success, then we'll log the word "SUCCESS" to the console & pass in the actual response 
    object along with it .  */
   // .then(
    //    function() {
    //        console.log("SUCCESS!");
    //    },
        /* An error() function is provided that takes 'error' as the parameter i.e we pass in any error codes we receive &
        then log the word "FAILED" to the console passing in the 'error' object with it. */
    //    function(error) {
    //        console.log("FAILED", error);
    //    });
       // return false;
//}

(function(){
    emailjs.init("user_YH98pL3tdBRqHfHhncbX0"); // we copied this User ID from the installation page of emailjs doc to ensure that we have a valid emailJS account for sending emails.
    //emailjs.send("gmail", "christiana", {}); // templateParams. userID is optional bcos we used emailjs.init that has the user id already.
})();

function sendMail() {
    let fullName = document.getElementById("fullname").value;
    let emailAddress = document.getElementById("emailaddress").value;
    let projectSummary = document.getElementById("projectsummary").value;

        var contactDetails = {
            from_name: fullName,
            from_email: emailAddress,
            project_request: projectSummary
        };

        emailjs.send("gmail", "christiana", contactDetails).then(function (res) {})
}