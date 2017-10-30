//This will be the file that hosts the submit button and devour button jquery.

$(function() {
  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {name:$("#burg").val().trim()};

    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        location.reload();
      }
    );
  });

  $(".devour-burger").on("click", function(event) {
    var id = $(this).data("id");
    var newDevour = $(this).data("newdevour");

    var newDevourState = {devour: newDevour}

    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newDevourState
    }).then(
      function() {
        console.log("changed burger to", newDevour);
        location.reload();
      }
    );
  });
  
});

