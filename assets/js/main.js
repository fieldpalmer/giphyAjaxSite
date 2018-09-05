    // Initial array of topic buttons
    var topics = ['90s', 'Computers', 'Gandalf', 'funny', 'psychadelic', 'animals', 'awesome', 'flight', 'monty python', 'dunk', 'dancing baby', 'yoda'];
    //blank array to hold thumbnails of favorite gifs
    var faveGifs = [];

    // Function for displaying buttons with topic data
    function renderButtons() {
        // Deleting the gifs prior to adding new gifs
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var gifButton = $("<button>");
            // Adding a class of movie-btn to our button
            gifButton.addClass("gif-btn btn btn-outline-info m-1");
            // Adding a data-attribute
            gifButton.attr("data-name", topics[i]);
            // Providing the initial button text
            gifButton.text(topics[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(gifButton);
        }   
    }

    // displayMovieInfo function re-renders the HTML to display the appropriate content
    function displayGifInfo () {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=cLh5y63AXPcyRhP521PdV7eirqOr15bG&limit=10";
        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            //Storing the gif data
            // var results = response.data;
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

                var cardBody = $("<div>");
                cardBody.attr("class", "card-body");
                gifSpan.wrap(cardBody);

                // Storing & displaying  the gif url
                var imgUrl = response.data[j].images;

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

    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#gif-request").val().trim();
        // Adding movie from the textbox to our array
        topics.push(newTopic);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });    

    function showFaves() {
        var retrieveFaves = JSON.parse(localStorage.getItem("gifSrcArray"));        
        for (var k = 0 ; k < retrieveFaves.length ; k++) {
            var newFave = $("<img>");        
            newFave.attr("src", retrieveFaves[k]);
            newFave.attr("class", "m-1");
            $(".fave-gifs").append(newFave);
        };
    }

    
    // Adding a click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", displayGifInfo)
    
    // Calling the renderButtons function to display the intial buttons
    renderButtons();
    showFaves();