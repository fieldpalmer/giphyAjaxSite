    // Initial array of topic buttons
    var topics = ['90s', 'Gandalf', 'woah dude', 'psychadelic', 'happy dance', 'awesome', 'cool beans', 'monty python', 'jim carrey', 'dancing baby'];
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
            gifButton.addClass("gif-btn");
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
                var gifDiv = $("<div class='gifs'>");
                
                // Storing & displaying the rating data
                var gifRating = response.data[j].rating;
                var ratingText = $("<p>").text("Rating: " + gifRating);
                gifDiv.append(ratingText);

                // Storing & displaying  the gif title
                var gifTitle = response.data[j].title;
                var titleText = $("<p>").text("Title: " + gifTitle);
                gifDiv.append(titleText);

                // Storing & displaying  the gif url
                var imgUrl = response.data[j].images;
                var gifDisplay = $("<img>");
                gifDisplay.attr("src", imgUrl.downsized_still.url);
                gifDisplay.attr("data-still", imgUrl.downsized_still.url);
                gifDisplay.attr("data-animate", imgUrl.downsized.url);
                gifDisplay.attr("data-state", "still");
                gifDisplay.attr("class", "gif")
                
                gifDiv.append(gifDisplay);

                // Putting the entire gif set above the previous gifs
                $("#gifs-view").prepend(gifDiv);
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
    // This function handles events where a movie button is clicked
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var newTopic = $("#gif-request").val().trim();
        // Adding movie from the textbox to our array
        topics.push(newTopic);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        });

    // Adding a click event listener to all elements with a class of "gif-btn"
    $(document).on("click", ".gif-btn", displayGifInfo);
    // Calling the renderButtons function to display the intial buttons
    renderButtons();