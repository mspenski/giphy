var gifButtons = ["Tiger Woods", "LeBron James", "Owen Wilson", "Will Ferrell", "Will Smith", "Emma Stone", "Tom Cruise", "Oprah", "Ellen Degeneres"]
var searchInput;

$(".gif").on("click", function() {
  
  var state = $(this).attr("data-state")

  var animateUrl = response.data[i].images.fixed_height.url;
  var stillUrl = response.data[i].images.fixed_height_still.url;

    //if the state is equal to still...
  if (state === "still"){
      //changes the src attribute of the img tag to the animateGif value (data-animate)
      $(this).attr("src", animateUrl)
      //changes the data-state value from "still" to "animate"
      $(this).attr("data-state", "animate")
    //if the state is equal to animate...
  }else if(state === "animate"){
      //changes the src attribute of the image tag to the stillGif value (data-still)
      $(this).attr("src", stillUrl)
      //changes the data-state value to "still"
      $(this).attr("data-state", "still")
  }

  
});
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
        var imageUrl = response.data[i].images.fixed_height.url;
        var gif = $("<img>");
        gif.attr("src", imageUrl);
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