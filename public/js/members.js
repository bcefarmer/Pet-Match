$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  const loadPage = () => {
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);

      $("#currentList").empty();
  
      data.list.forEach(note => {
        const noteLi = $("<li>").text(note);
  
        $("#currentList").append(noteLi);
      });
    });
  }


  // MY ADDED API BUTTON
  $(".apiBtn").on("click", async function (event) {
    event.preventDefault();
  $('#breedList').html('');

    let animalType = "";
    let animalGender ="";
    
    const petListItem = $(event.target);
    console.log(petListItem);

    animalType = petListItem[0].dataset.type;
    animalGender = petListItem[0].dataset.gender;

    console.log(`animalType = ${animalType} & animalGender = ${animalGender}`);
   
    let rawData = "";

    rawData = await authorization(animalType, animalGender);

    parseAnimals(rawData);

})
// --------------------------------------

  $("#noteForm").on("submit", (event) => {
    event.preventDefault();

    $.post("/api/saveList", {
      note: $('#newNoteTextArea').val()
    })
      .then(function(data) {
        window.location.reload();
      })
  })

  loadPage();
// API ADDITIONS
}) 
const authorization = (animalType, animalGender) =>{
  
  let api_key = "q0QpMcscGQuY1S3pI9OXYHzJW8OkMOX27dgtB9OslNJYB1Dkgi";
  let client_secret = "ZVYktHRXWvV5zQm4X6TJHnwody4JqFiBikXWJNh3";
  let stringBody =  `grant_type=client_credentials&client_id=${api_key}&client_secret=${client_secret}`
    
  // GET TOKEN ******
  const getAnimal = () =>
    fetch('https://api.petfinder.com/v2/oauth2/token', {
    method: 'POST',
    body: stringBody,
    headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              
    }
    })
    .then(
      function(data){
        console.log(`Token Data: ${data}`)
        return data.json();
      }
    )
    .then(function(data){
     // let myURL = `https://api.petfinder.com/v2/animals?types/${animalType}/species/${animalType}/gender/${animalGender}&page=3`
     let myURL = `https://api.petfinder.com/v2/animals?types=${animalType}&species=${animalType}&gender=${animalGender}&page=7`
     
      console.log('token', data);
      return fetch(myURL, {
                    method: 'GET',
                    headers: {
                    "Authorization": `${data.token_type} ${data.access_token}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                });
                })
    .then(function(response){
      if(response.ok){
      return response.json();
    };
    })

   .catch(function(error) {                        // catch
   console.log('Request failed', error);
   alert("This request failed.  Please try again.")
});

return getAnimal();
}



/*
//---------------------------------------------------------------------
  PURPOSE: Turns JSON response into actionable data.

  PARAMETERS: rawData.  This is the JSON object immediate returned after
              the query.

  RETURNS: none

  MISC: 
*/
//-----------------------------------------------------------------------

function parseAnimals(rawData){

      let baseObject = rawData.animals;
      console.log(baseObject);
     
      let creatureArray = [];
      var photoSelect = "";

      var animalInfo = baseObject.map( function(baseObject) {
            
            photoSelect = "";
            if(baseObject.photos[0] !== undefined){
               photoSelect = baseObject.photos[0].small;
               console.log(`----- ${photoSelect}`);
            }else{
             photoSelect = "https://cdn1.vectorstock.com/i/1000x1000/51/75/cat-and-dog-silhouettes-vector-825175.jpg";
            }
        
           
           
            var info = { "id": baseObject.id,
                         "url": baseObject.url,
                         "type": baseObject.type,
                         "breed": baseObject.breeds.primary,
                         "age": baseObject.age,
                         "gender": baseObject.gender,
                         "name": baseObject.name,
                         "description": baseObject.tags,
                         "photo": photoSelect,
                         "phone": baseObject.contact.phone
                        }
                creatureArray.push(info);
        })

        console.log(creatureArray);
        makeBody(creatureArray);
      };



      function makeBody(creatureArray){

          const myList = document.querySelector("#breedList");
          myList.style.listStyleType="none";
          myList.innerHTML="";
          $("#breedList").html("");

          const rowWrapper = document.createElement("div");
          rowWrapper.setAttribute("class","row");
          rowWrapper.style.marginBottom = "30px";
          rowWrapper.style.boxSizing = "border-box";
          rowWrapper.style.marginLeft = "-15px";
          rowWrapper.style.marginRight = "15px";

          myList.append(rowWrapper);
          
          for( var i = 0; i < creatureArray.length; i++ ) {
           
          let listedPhone = "";

          if(creatureArray[i].phone === "undefined" || creatureArray[i].phone === "undefined"){
            listedPhone = "Not Listed"
          }else{
            listedPhone = creatureArray[i].phone;
          }
           
           var pinkNotes = 
             {
             'Name': creatureArray[i].name,
             'Breed': creatureArray[i].breed,
              'Age': creatureArray[i].age,
              'Gender': creatureArray[i].gender,
              'Link': creatureArray[i].url,
              'Phone':listedPhone
             }
  

            var otherNotes =
            {
            
           }
            
            // Outer Div
            
            var list_div = document.createElement("li");
            list_div.style.height="300px";
            
            list_div.setAttribute('data-id',creatureArray[i].id);
            
            list_div.setAttribute("class","animalListItem col-4 text-center justify-content-center");
            // list_div.innerHTML=notes;
            list_div.className = "card-property";
 


            // Image Div
            var imageDiv = document.createElement("center");
                imageDiv.setAttribute("class","img-container text-center");
                imageDiv.style.boxSizing="border-box";
                imageDiv.style.backgroundColor="white";
                imageDiv.style.display="block";
                imageDiv.style.textAlign="-webkit-center";
                imageDiv.style.height="80px";
                imageDiv.style.width="80px";
               
                
                

        
            // Actual animal image.
            var creatureImage = document.createElement('img');
               creatureImage.setAttribute("src", creatureArray[i].photo );
               creatureImage.style.maxHeight = "100%";
               creatureImage.style.maxWidth="100%";
               creatureImage.style.listStyleType="none";
               
               

            imageDiv.appendChild(creatureImage);

            list_div.appendChild(imageDiv);

            rowWrapper.appendChild(list_div);

            var pinkBox = document.createElement("div");
            pinkBox.setAttribute("class", "box-bottom");
            pinkBox.innerHTML =
              `${pinkNotes.Name.toUpperCase()} <br>
                My breed: ${pinkNotes.Breed} <br>
                My age: ${pinkNotes.Age} <br> `
                ;
               
               
                /*
                 Find me <a href='${pinkNotes.Link}'>here</a> <br>
                Phone: ${pinkNotes.Age}
                */

            pinkBox.style.backgroundColor="#009970";
            pinkBox.style.padding = "padding: 20px 0";
            pinkBox.style.textAlign = "center";
            pinkBox.style.display = "block";
          
            list_div.appendChild(pinkBox);
          
            var infoBox = document.createElement("div");
            infoBox.setAttribute("class", "box");
            infoBox.style.padding = "padding: 20px 0";
            infoBox.style.textAlign = "center";
            infoBox.style.display = "block";
            infoBox.style.boxSizing = "border-box";
            infoBox.style.backgroundColor="white";
            infoBox.style.color="black";

            infoBox.innerHTML =
            ` Find me <a href='${pinkNotes.Link}'>here</a> <br>
              Phone: <button class="info callGenerate" style="color: black; border: none; background-color: none;" data-pNumber=${pinkNotes.Phone}>${pinkNotes.Phone}</button> `
              ;

          list_div.append(infoBox);

         
      
           }
           $(".callGenerate").on("click", async function (event) {
            event.preventDefault();
          
            let callShelterBtn = $(event.target);
            let dataPhone = callShelterBtn[0].innerText;
            let stringSet = String(dataPhone);
            let phoneFilter = stringSet.replace("(","")
                                        .replace("-","")
                                        .replace(" ","")
                                        .replace(")","")
                                        .replace(" - ", "")
                                        .replace("{","")
                                        .replace("}","")
                                        .replace(" -", "")
                                        .replace("- ","")
                                        .replace("-","");
                                        

            let messageBody = {phoneNumber: phoneFilter};
           
             ; 
            
              
             
               

         
              
               const reachOut = await $.ajax(
              {
              url: "/api/call",
              contentType: "application/JSON",
              method: 'POST',
              datatype: 'json',
              data: JSON.stringify(messageBody),
              error: function (err) {
                console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
            }
        }).always(function(jqXHR, textStatus) {
            if (textStatus != "success") {
                alert("Error: " + jqXHR.statusText);
            }
        });
              
            
               

          })}

             
          
          
             
        
          
        
          
           


          
  
      
        
  
          

           



