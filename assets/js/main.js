// Initial array of topic buttons
var topics = ['90s', 'Computers', 'Gandalf', 'funny', 'psychadelic', 'animals', 'awesome', 'flight', 'monty python', 'dunk', 'dancing baby', 'yoda'];
//blank array to hold thumbnails of favorite gifs
var faveGifs = [];

// Function for displaying buttons with topic data
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var gifButton = $("<button>");
        gifButton.addClass("gif-btn btn btn-outline-info m-1");
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#buttons-view").append(gifButton);
    }   
}

// function to pull data from giphy api and display it on our site
function displayGifInfo () {
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=cLh5y63AXPcyRhP521PdV7eirqOr15bG&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var j = 0 ; j < response.data.length ; j++) {
            // Creating a div to hold the gifs
            var gifSpan = $("<div>");
            gifSpan.attr("class", "gifs card p-3 align-middle d-inline-block text-white");
            gifSpan.attr("style", "width: 17rem");
            // Storing & displaying  the gif title
            var gifTitle = response.data[j].title;
            var titleText = $("<h5>").text(gifTitle);
            titleText.attr("class", "card-title pt-2");
            gifSpan.append(titleText);
            // Storing & displaying the rating data
            var gifRating = response.data[j].rating;
            var ratingText = $("<p>").text("Rating: " + gifRating);
            ratingText.attr("class", "card-text");                
            gifSpan.append(ratingText);
            // Creating the div to hold each gif
            var cardBody = $("<div>");
            cardBody.attr("class", "card-body");
            gifSpan.wrap(cardBody);
            // Storing & displaying  the gif url
            var imgUrl = response.data[j].images;
            // Creating & displaying the gif itself with attributes
            var gifDisplay = $("<img>");
            gifDisplay.attr("src", imgUrl.downsized_still.url);
            gifDisplay.attr("data-still", imgUrl.downsized_still.url);
            gifDisplay.attr("data-animate", imgUrl.downsized.url);
            // gifDisplay.attr("data-thumbnail", imgUrl.fixed_height_small.url)
            gifDisplay.attr("data-state", "still");
            gifDisplay.attr("class", "gif card-img-top");
            gifSpan.prepend(gifDisplay);
            //Creating and linking button to add to favorites / local storage
            var faveButton = $("<input>");
            faveButton.attr("class", "btn btn-success btn-block");
            faveButton.attr("id", "faveBTN");
            faveButton.attr("value", "Favorite");
            faveButton.attr("data-thumbnail", imgUrl.fixed_height_small.url);
            gifSpan.append(faveButton);
            //displaying the gif cards in columns
            gifCardCols = $("<div>");
            gifCardCols.attr("class", "card-columns")
            gifSpan.wrap(gifCardCols);
            // Putting the entire gif set above the previous gifs
            $("#gifs-view").prepend(gifSpan);
            // what happens when you click favorite
            $("#faveBTN").on("click", function(){
                var newFave = $("<img>");
                var faveGifSrc = $(this).attr("data-thumbnail")
                faveGifs.push(faveGifSrc);
                newFave.attr("src", faveGifSrc);
                newFave.attr("class", "m-1");
                $(".fave-gifs").prepend(newFave);
                localStorage.setItem("gifSrcArray", JSON.stringify(faveGifs));
            })
        }
        // animating the gifs
        $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        });
    });   
}
// new gif button process
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var newTopic = $("#gif-request").val().trim();
    topics.push(newTopic);
    renderButtons();
});   
// showing our favorites pulled from storage 
function showFaves() {
    var retrieveFaves = JSON.parse(localStorage.getItem("gifSrcArray"));        
    for (var k = 0 ; k < retrieveFaves.length ; k++) {
        var newFave = $("<img>");        
        newFave.attr("src", retrieveFaves[k]);
        newFave.attr("class", "m-1");
        $(".fave-gifs").append(newFave);
    };
}

$(document).on("click", ".gif-btn", displayGifInfo)

renderButtons();
showFaves();