var gifButtons = ["Tiger Woods", "LeBron James", "Owen Wilson", "Will Ferrell", "Will Smith", "Emma Stone", "Tom Cruise", "Oprah", "Ellen Degeneres", "Cam Newton", "Christian Pulisic", "Aaron Rodgers"]``
var searchInput;

function gifResults() {
  
    var url = "https://api.giphy.com/v1/gifs/search?api_key=X2W6v0C6HbbMrBAkzhdpbivMQsaNbpVo&q=" + searchInput + "&limit=10&offset=0&rating=PG-13&lang=en"
   

    $.ajax({
        url: url,
        method: 'GET',
    }).then(function (response) {
      $("#results").empty();
      for(var i=0; i<response.data.length; i++){
        
        console.log(response.data);
        console.log(response.data[i].images.fixed_height.url);

        var ratingP = $("<p>").text("Rating: " + response.data[i].rating);
        // var imageUrl = response.data[i].images.fixed_height.url;
        var gif = $("<img>");
        var animateUrl = response.data[i].images.fixed_height.url;
        var stillUrl = response.data[i].images.fixed_height_still.url;

        gif.attr("src", stillUrl);
        gif.attr("data-state", "still")
        gif.attr("data-animate", animateUrl)
        gif.attr("data-still", stillUrl)
        gif.addClass("gif")


        $("#results").append(gif);
        $("#results").append(ratingP);

    }
    
  }); 
};


function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < gifButtons.length; i++) {
        var a = $("<button>");

        a.addClass("gif-btn");
        a.attr("data-name", gifButtons[i]);
        a.text(gifButtons[i]);

        $("#buttons-view").append(a);
    }
}

$("#submit").on("click", function (event) {
    event.preventDefault();  
    searchInput = $("#search").val();
    // gifButtons.push(searchInput);
    renderButtons();
    gifResults();

});

$("#clear").on("click", function (event) {
  event.preventDefault();
  $("#results").empty();
});

$(document).on("click", ".gif-btn", function(event){
    event.preventDefault();
    searchInput = $(this).attr("data-name");
    console.log($(this).attr("data-name"));
    gifResults();

});

renderButtons();

$(document).on("click", ".gif", function() {

  console.log("this works!");

  var state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});