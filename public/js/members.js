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

});

                        
