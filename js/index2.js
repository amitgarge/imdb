/* This js file is responsible for all input and output related operations
and making the ajax request*/

$(document).ready(() => {
  /*Clicking on search button of the 'By Title' section*/
  $("#searchByTitleAndYear").click((e) => {
    e.preventDefault();

    /*Validations for the fields*/
    if ($('#title').val() == '' && $("#year").val() == '') {
      alert("Atleast Title is necessary to search.");

    } else if ($('#title').val() !== '' && $("#year").val() == '') {
      /*When, only title is provided*/
      getResponse($('#title').val(), 1);

    } else if ($('#title').val() == '' && $("#year").val() != '') {
      /*When, only year is provided*/
      alert("Title is compulsory.");

    } else {
      // when both title and year are provided...
      let title = $("#title").val();
      let year = $("#year").val();
      getResponse(title, year);
    }
  });

  /*Clicking on search button of the 'By ID' section*/
  $("#searchByID").click((e) => {

    e.preventDefault();

    if ($("#ID").val() === '')
      alert("ID is compulsory.");
    else
      getResponse($("#ID").val(), 2);
  });
});

/* Updating the link, calling the "OMDb API", using following function */
let getResponse = (field, num) => {

  let link = "";

  /*Updating the link*/
  // if input is title and num is year then link will be updated with the title and year.
  if ((field !== undefined && num !== 1) && (field !== undefined && num !== 2)) {
    link += `https://www.omdbapi.com/?t=${field}&y=${num}&apikey=55a2e24`;
  } else if (field !== undefined && num === 1) {
    // if input is title and num is 1 then link will be updated with the title.
    link += `https://www.omdbapi.com/?t=${field}&apikey=55a2e24`;
  } else if (field !== undefined && num === 2) {
    // if input is id and num is 2 then link will be updated with the id.
    link += `https://www.omdbapi.com/?i=${field}&apikey=55a2e24`;
  }

  /* Ajax request*/
  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: true,
    url: link,

    success: (response) => {
      if (response.Response === "True") {
        /*if API Response is true...*/

        /* Displaying search-result section and hiding all other sections*/
        $("#Error").hide();
        $("#search_result").show(2000);
        $("#main").hide();
        $(".totalSeasons").hide();


        //Setting the values of the HTML elements...

        //title
        $("#Result_title").text(response.Title);

        //year
        $("#Result_year").text(`(${response.Year})`);

        //Type (movie, series, episode etc.)
        $("#Result_type").text(`(${response.Type})`);

        //Censor Rating
        if (response.Rated === "NOT RATED")
          $("#Result_rated").text("N/A");
        else
          $("#Result_rated").text(response.Rated);

        //Runtime
        if (hasNumber(response.Runtime)) //cheking is Runtime has a number...
          //converting runtime (which is mins into hh:mm format)...
          $("#Result_runtime").text(minutesToHours(response.Runtime) + " min(s)");
        else
          $("#Result_runtime").text(response.Runtime);

        //Release Date
        if (response.hasOwnProperty("Released"))
          $("#Result_release-date").text(` ${response.Released}`);
        else
          $("#Result_release-date").text("N/A");

        //Poster
        if (response.hasOwnProperty("Poster")) {
          $("#Result_poster").attr("src", response.Poster);
          $("#Result_poster-small").attr("src", response.Poster);
        } else {
          $("#Result_poster").attr("src", "img/dummy.jpg");
          $("#Result_poster-small").attr("src", "img/dummy.jpg");
        }

        //Language
        if (response.hasOwnProperty("Language"))
          $("#Result_language").text(` ${response.Language}`);
        else
          $("#Result_language").text("N/A");

        //Genre
        if (response.hasOwnProperty("Genre"))
          $("#Result_genre").text(` ${response.Genre}`);
        else
          $("#Result_genre").text("N/A");

        //Plot
        if (response.hasOwnProperty("Plot"))
          $("#Result_plot").text(response.Plot);
        else
          $("#Result_plot").text("N/A");

        //Actors
        if (response.hasOwnProperty("Actors"))
          $("#Result_actors").text(response.Actors);
        else
          $("#Result_actors").text("N/A");

        //Director
        if (response.hasOwnProperty("Director"))
          $("#Result_director").text(response.Director);
        else
          $("#Result_director").text("N/A");

        //Writer
        if (response.hasOwnProperty("Writer"))
          $("#Result_writer").text(response.Writer);
        else
          $("#Result_writer").text("N/A");

        //IMDb ID
        $("#imdb-id").text(response.imdbID);
        
        //IMDb Ratings
        if (response.hasOwnProperty("imdbRating"))
          $("#imdb-ratings").text(response.imdbRating);
        else
          $("#imdb-ratings").text("N/A");

        //IMDb Votes
        if (response.hasOwnProperty("imdbVotes"))
          $("#imdb-votes").text(response.imdbVotes);
        else
          $("#imdb-votes").text("N/A");

        //Metascore
        if (response.hasOwnProperty("Metascore"))
          $("#metascore").text(response.Metascore);
        else
          $("#metascore").text("N/A");

        //Country
        if (response.hasOwnProperty("Country"))
          $("#country").text(response.Country);
        else
          $("#country").text("N/A");

        //Awards
        if (response.hasOwnProperty("Awards"))
          $("#awards").text(response.Awards);
        else
          $("#awards").text("N/A");

        //DVD
        if (response.hasOwnProperty("DVD"))
          $("#dvd").text(response.DVD);
        else
          $("#dvd").text("N/A");

        //BoxOffice Collection
        if (response.hasOwnProperty("BoxOffice"))
          $("#boxoffice").text(response.BoxOffice);
        else
          $("#boxoffice").text("N/A");

        //Production House
        if (response.hasOwnProperty("Production"))
          $("#prouction").text(response.Production);
        else
          $("#prouction").text("N/A");

        //Website
        if (response.hasOwnProperty("Website")) {
          if (response.Website != "N/A")
            $(".website").html(`
            <a id="website" target="_blank" href="${response.Website}">${response.Website}</a>`);
          else
            $(".website").html(response.Website);
        } else {
          $(".website").text("N/A");
        }

        //Total seasons (it is visible only when, the 'type' is 'series')
        if (response.hasOwnProperty("totalSeasons")) {
          $(".totalSeasons").show();
          $("#totSeasons").text(response.totalSeasons);
        } else {
          $(".totalSeasons").hide();
        }

        //Raitings table
        if (response.hasOwnProperty("Ratings")) {
          $(".RatingsTable").empty();
          if (response.Ratings.length != 0) {
            for (const rating of response.Ratings) {
              $(".RatingsTable").append(
                `<div class="col Source">
                  <span class="information-title">
                    ${rating.Source}
                  </span>
                  <div class="col">
                    ${rating.Value}
                  </div>
                </div>`
              );
            }
          } else
            $(".RatingsTable").append(
              `<div class="col">
                  <span class="information-title">
                    No Ratings Available
                  </span>
                </div>`
            );
        } else
          $(".RatingsTable").hide();

      } else {
        //When 'Response returns 'false', 'error view' will be displayed
        $("#search_result").hide();
        $("#main").hide();
        $("#Error").show(2000);
      }
    },

    timeout: 5000, //timeout is 5 sec.

    error: (request, errorType, errorMessage) => {
      if (errorType === "timeout") {
        $("#main").hide();
        $(".time-out").show();

      } else {
        $("#main").hide();
        $("#Error").show(2000);
      }
    },

    //Loader will be displayed while request is sent and wating for the response
    beforeSend: () => {
      $(".loader").show();
      $("#main").hide();
      $("#search_result").hide();
    },
    complete: () => {
      $('.loader').hide();
    }
  });
}

/*Function converting mins data (which is a string e.g. 143mins) into 02:23*/
let minutesToHours = (mins) => {
  mins = parseInt(mins);

  let h = Math.floor(mins / 60);
  let m = mins % 60;

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;

  return ` ${h}:${m}`;
}

//Checks for string contains number and returns true or false 
let hasNumber = (myString) => {
  //The test() method tests for a match in a string and if found return true else false
  
  return /\d/.test(myString);//check for the digit or number [0-9] in the myString variable
}