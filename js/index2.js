$(document).ready(() => {

  $("#searchByTitleAndYear").click((e) => {
    e.preventDefault();

    if ($('#title').val() == '' && $("#year").val() == '') {
      alert("Atleast Title is necessary to search.");

    } else if ($('#title').val() !== '' && $("#year").val() == '') {
      getResponse($('#title').val(), 1);

    } else if ($('#title').val() == '' && $("#year").val() != '') {
      alert("Title is compulsory.");

    } else {
      // Taking the value of input and calling function with value as parameter.
      let title = $("#title").val();
      let year = $("#year").val();
      getResponse(title, year);
    }
  });

  $("#TitleAndYearReset").click((e) => {
    e.preventDefault();
    $("#title").val('');
    $("#year").val('');
  });

  $("#searchByID").click((e) => {

    e.preventDefault();

    if ($("#ID").val() === '')
      alert("ID is compulsory.");
    else
      getResponse($("#ID").val(), 2);

  });

  $("#ResetIDField").click((e) => {

    e.preventDefault();
    $("#ID").val('');

  });
});

let getResponse = (field, num) => {

  let link = "";

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

  $.ajax({
    type: 'GET',
    dataType: 'json',
    async: true,
    url: link,

    success: (response) => {
      if (response.Response === "True") {

        $("#Error").hide();
        $("#search_result").show(2000);
        $("#main").hide();
        $(".totalSeasons").hide();

        $("#Result_title").text(response.Title);
        $("#Result_year").text(`(${response.Year})`);
        $("#Result_type").text(`(${response.Type})`);

        if (response.Rated === "NOT RATED")
          $("#Result_rated").text("N/A");
        else
          $("#Result_rated").text(response.Rated);

        if (hasNumber(response.Runtime))
          $("#Result_runtime").text(minutesToHours(response.Runtime) + " min(s)");
        else
          $("#Result_runtime").text(response.Runtime);

        if (response.hasOwnProperty("Released"))
          $("#Result_release-date").text(` ${response.Released}`);
        else
          $("#Result_release-date").text("N/A");

        if (response.hasOwnProperty("Poster")) {
          $("#Result_poster").attr("src", response.Poster);
          $("#Result_poster-small").attr("src", response.Poster);
        } else {
          $("#Result_poster").attr("src", "img/dummy.jpg");
          $("#Result_poster-small").attr("src", "img/dummy.jpg");
        }

        if (response.hasOwnProperty("Language"))
          $("#Result_language").text(` ${response.Language}`);
        else
          $("#Result_language").text("N/A");

        if (response.hasOwnProperty("Genre"))
          $("#Result_genre").text(` ${response.Genre}`);
        else
          $("#Result_genre").text("N/A");

        if (response.hasOwnProperty("Plot"))
          $("#Result_plot").text(response.Plot);
        else
          $("#Result_plot").text("N/A");

        if (response.hasOwnProperty("Actors"))
          $("#Result_actors").text(response.Actors);
        else
          $("#Result_actors").text("N/A");

        if (response.hasOwnProperty("Director"))
          $("#Result_director").text(response.Director);
        else
          $("#Result_director").text("N/A");

        if (response.hasOwnProperty("Writer"))
          $("#Result_writer").text(response.Writer);
        else
          $("#Result_writer").text("N/A");

        if (response.hasOwnProperty("imdbID"))
          $("#imdb-id").text(response.imdbID);
        else
          $("#imdb-id").text("N/A");

        if (response.hasOwnProperty("imdbID"))
          $("#imdb-ratings").text(response.imdbRating);
        else
          $("#imdb-ratings").text("N/A");

        if (response.hasOwnProperty("imdbVotes"))
          $("#imdb-votes").text(response.imdbVotes);
        else
          $("#imdb-votes").text("N/A");

        if (response.hasOwnProperty("Metascore"))
          $("#metascore").text(response.Metascore);
        else
          $("#metascore").text("N/A");

        if (response.hasOwnProperty("Country"))
          $("#country").text(response.Country);
        else
          $("#country").text("N/A");

        if (response.hasOwnProperty("Awards"))
          $("#awards").text(response.Awards);
        else
          $("#awards").text("N/A");

        if (response.hasOwnProperty("DVD"))
          $("#dvd").text(response.DVD);
        else
          $("#dvd").text("N/A");

        if (response.hasOwnProperty("BoxOffice"))
          $("#boxoffice").text(response.BoxOffice);
        else
          $("#boxoffice").text("N/A");

        if (response.hasOwnProperty("Production"))
          $("#prouction").text(response.Production);
        else
          $("#prouction").text("N/A");

        if (response.hasOwnProperty("Website")) {
          if (response.Website != "N/A")
            $(".website").html(`
            <a id="website" target="_blank" href="${response.Website}">${response.Website}</a>`);
          else
            $(".website").html(response.Website);
        } else {
          $(".website").text("N/A");
        }

        if (response.hasOwnProperty("totalSeasons")) {
          $(".totalSeasons").show();
          $("#totSeasons").text(response.totalSeasons);
        } else {
          $(".totalSeasons").hide();
        }

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
        $("#search_result").hide();
        $("#main").hide();
        $("#Error").show(2000);
      }
    },

    timeout: 5000,

    error: (request, errorType, errorMessage) => {
      if (errorType === "timeout") {
        $("#main").hide();
        $(".time-out").show();

      } else {
        console.log("success");
      }
    },

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

let minutesToHours = (mins) => {
  mins = parseInt(mins);

  let h = Math.floor(mins / 60);
  let m = mins % 60;

  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;

  return ` ${h}:${m}`;
}

let hasNumber = (myString) => {
  return /\d/.test(myString);
}