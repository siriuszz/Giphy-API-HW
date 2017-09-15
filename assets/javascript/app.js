var shows = ["Seinfeld", "Friends", "The Simpsons", "Happy Days", "Parks and Recreation", "Bob's Burgers", "I Love Lucy", "The Office"];

function displayGif() {
    var show = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=e72cc56b231c4da8a28ab54630c2c373&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var gifDiv = $("<div class='gif'>");
        console.log(response.data[0].embed_url)
        for (var j = 0; j < 10; j++) {
            var showGif = response.data[j].embed_url;
            var image = $("<p>").attr("src", showGif);
            gifDiv.append(image);}
    });
}


    function renderButtons() {
        $("#tv-buttons").empty();

        for (var i = 0; i < shows.length; i++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", shows[i]);
            a.text(shows[i]);
            $("#tv-buttons").append(a);
        }
    }


    $("#add-show").on("click", function(event){
        var show = $("#tv-input").val().trim();
        shows.push(show);
        renderButtons();
        });

    $(document).on("click", ".gif", displayGif);

    renderButtons();




