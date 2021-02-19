$('document').ready(function() {

  console.log(`Loading /members`),

  $(".creatureBullet").on("click", async function (event) {
      event.preventDefault();
      const petListItem = event.target;

      const animalType = $("petListItem").attr("data-type").trim();
      const animalGender = $("petListItem").attr("data-gender").trim();
      console.log(`animalType = ${animalType} & animalGender = ${animalType}`);


        const rawData = await authorization(animalType);

         parseAnimals(rawData);
  
})
 
});


/*
//---------------------------------------------------------------------
  PURPOSE: Goes through Oauth process to get temporary-bearer token.                       Also
           Grabs json object representing a list of available animals.  Does
           not parse list.
  PARAMETERS: animalType.  This parameter represents the user's search
              choice.
  RETURNS: If successful, results are sent to on-click function of #animalFind.
*/
//-----------------------------------------------------------------------


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
                'Content-Type': 'application/x-www-form-urlencoded'
      }
      })
      .then(
        function(data){
          return data.json();
        }
      )
      .then(function(data){
        console.log('token', data);
        return fetch(`https://api.petfinder.com/v2/animals?type=${animalType}&gender=${animalGender}&page=3`, {
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
        console.log(`Raw data excerpt: ${JSON.stringify(baseObject[0])}`);
        let creatureArray = [];
        var photoSelect = "";
  
        var animalInfo = baseObject.map( function(baseObject) {
              
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
                           "photo": photoSelect
                          }
                  creatureArray.push(info);
          })
  
          console.log(creatureArray);
          makeBody(creatureArray);
        };
  
  
  
        function makeBody(creatureArray){
  
            const myList = document.querySelector("#breedList")
            myList.innerHTML="";
            for( var i = 0; i < creatureArray.length; i++ ) {
  
             var pinkNotes = 
             {
             'Name': creatureArray[i].name,
             'Breed': creatureArray[i].breed
             }
  
              var otherNotes =
              {
              'Age': creatureArray[i].age,
              'Gender': creatureArray[i].gender,
              'Link': creatureArray[i].url
             }
              
              // Outer Div
  
              var list_div = document.createElement("li");
              list_div.setAttribute('data-id',creatureArray[i].id);
              list_div.setAttribute("class", "class-lg-3")
              list_div.setAttribute("class","animalListItem");
              // list_div.innerHTML=notes;
   
  
  
              // Image Div
              var imageDiv = document.createElement("div");
                  imageDiv.setAttribute("class","img-container")
          
              // Actual animal image.
              var creatureImage = document.createElement('img');
                 creatureImage.setAttribute("src", creatureArray[i].photo );
  
              imageDiv.appendChild(creatureImage);
  
              list_div.appendChild(imageDiv);
  
              myList.appendChild(list_div);
  
              var pinkBox = document.createElement("div");
              pinkBox.setAttribute("class", "box-bottom");
              pinkBox.innerHTML =
              `${pinkNotes.Name.toUpperCase()} <br>
              ${pinkNotes.Breed}`;
  
              list_div.appendChild(pinkBox);
                
        }
        }
  