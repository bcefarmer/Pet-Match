$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#signupEmail");
  var passwordInput = $("input#signupPassword");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
   
   /*
    $.post("/api/signup", {
      email: email,
      password: password
    })*/
    const rawBody =  {
      email: email,
      password: password
    };

    const requestBody = JSON.stringify(rawBody);
    console.log(requestBody);
    fetch("/api/signup",{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: requestBody,

    }
    ).then(function(data) {
      console.log( `Data is read as: ` + data);
        
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});