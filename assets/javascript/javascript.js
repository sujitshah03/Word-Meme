$( document ).ready(function() {
    // An array of actions
    var actions = ["Dancing", "Running", "Falling", "Reading", "Pulling", "Swimming", "Eating", "Shouting", "Crying", "sleeping"];

    // Function to display all gif buttons
    function displayGifButtons(){
        $("#gifButtonsView").empty(); // deleting anything so it doesnt repeat the results
        for (var i = 0; i < actions.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", actions[i]);
            gifButton.text(actions[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    // Function to add a new activity
    function addNewButton(){
        $("#addGif").on("click", function(){
        var action = $("#action-input").val().trim();
        if (action == ""){
          return false; //  so user cannot add a blank button
        }
        actions.push(action);
    
        displayGifButtons();
        return false;
        });
    }
    // Function to remove last activity button
    function removeLastButton(){
        $("removeGif").on("click", function(){
        actions.pop(action);
        displayGifButtons();
        return false;
        });
    }
    // Function that displays all of the gifs
    function displayGifs(){
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=O1fUAnIfkCT22bIrB36UPj8fAlYAL3H9&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; //shows results of gifs
            if (results == ""){
              alert("Cannot find one");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); //div for the gifs 
                gifDiv.addClass("gifDiv");
                // rating of gif
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
                // pulling gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
                gifImage.attr("data-state", "still"); // set the image state
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                // pulling still image of gif
                // adding div of gifs to gifsView div
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    // Calling Functions & Methods
    displayGifButtons(); // displays list of activities already created
    addNewButton();
    removeLastButton();
    // Document Event Listeners
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });