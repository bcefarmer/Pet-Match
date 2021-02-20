// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    // res.sendFile(path.join(__dirname, "../views/layouts/main"));

    if(req.user) {
      console.log("Is authorized user")
     // res.redirect("/members")
     // res.render('members');
    } else {
      res.render('index');
    }
  
  });

  app.get("/signup", function(req, res) {
    if(req.user) {
        console.log("Is registered user.")
      // res.redirect("/members");
      
     //res.render("members", hbsObject);
    } else {
      res.render("signup");
    }
  })

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {
      res.render("index");
    }
    // res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
 
 
  app.get("/members", isAuthenticated, function(req, res) {
    console.log("user authenticated html-routes.js....app.get, isAuthenticated");

    db.pets.findAll({}).then(
      function(response){
      
          let myArray = [];  
          response.map((current_item,index) => {
          let createPartial =  {
          "type": response[index].type, 
          "gender": response[index].gender 
          }

          myArray.push(createPartial);
          console.log(`partial = ${createPartial}`)
      }

      )
    

      console.log(`array is ${myArray}`);

      const hbsObject = {
      pets: myArray
     
      }
      
     // console.log(`hbs object listed as ${JSON.stringify(hbsObject.pets)}`);
      res.render("members", hbsObject);
      
      }
      )
        .catch(err => console.log("The following error occurred in FindAll" + err))
    // res.render("members");

    // --------------------------

})

    


}