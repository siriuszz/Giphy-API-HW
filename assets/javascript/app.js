var shows = ["Seinfeld", "Friends", "The Simpsons", "Happy Days", "Parks and Recreation", "Bob's Burgers", "I Love Lucy", "The Office"];

function displayGif() {
    var show = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=e72cc56b231c4da8a28ab54630c2c373&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var gifDiv = $("<div class='gif'></div>");

        for (var j = 0; j < 10; j++) {
            var rating = response.data[j].rating;
            var pRating = $("<p>").text("Rating: " + rating);
            gifDiv.append(pRating);

            var dataStill = response.data[j].images.original_still.url;
            var dataAnimate = response.data[j].images.downsized.url;
            var pStill = $("<img>").attr({"src": dataStill, "data-still": dataStill, "data-animate": dataAnimate,});
            gifDiv.append(pStill);

            console.log(response);
            console.log(dataStill);
            console.log(dataAnimate);
        }

        $("#tv-shows").prepend(gifDiv);
    });
}


    function renderButtons() {
        $("#tv-buttons").empty();

        for (var i = 0; i < shows.length; i++) {
            var a = $("<button>");
            a.addClass("gif-button");
            a.attr("data-name", shows[i]);
            a.text(shows[i]);
            $("#tv-buttons").append(a);
        }
    }


    $("#add-show").on("click", function(event) {
        event.preventDefault();
        var show = $("#tv-input").val().trim();
        shows.push(show);
        renderButtons();
        });



    $(document).on("click", ".gif-button", displayGif);
    $(document).on("click", ".gif", pausePlay);

function pausePlay(event) {
    var state = $(this).attr("data-state");

    console.log(state);

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

    renderButtons();




