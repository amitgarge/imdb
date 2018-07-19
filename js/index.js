$(document).ready(() => {
  $("#main").show();
  $(".loader").hide();
  $(".time-out").hide();
  $("#search_result").hide();
  $("#Error").hide();

  $("#tabs-1").show();
  $("#tabs-2").hide();
  $("#tabs-3").hide();

  $("#Plot-Casting-details").show();
  $("#imdb-details-info").hide();
  $("#others-details").hide();

  $("#By-title").click(() => {
    $("#tabs-1").show();
    $("#tabs-2").hide();
    $("#tabs-3").hide();
  });

  $("#By-title-year").click(() => {
    $("#tabs-1").hide();
    $("#tabs-2").show();
    $("#tabs-3").hide();
  });

  $("#By-ID").click(() => {
    $("#tabs-1").hide();
    $("#tabs-2").hide();
    $("#tabs-3").show();
  });

  $("#Plot-Casting").click(() => {
    $("#Plot-Casting-details").show();
    $("#imdb-details-info").hide();
    $("#others-details").hide();
  });

  $("#imdb-details").click(() => {
    $("#Plot-Casting-details").hide();
    $("#imdb-details-info").show();
    $("#others-details").hide();
  });

  $("#others").click(() => {
    $("#Plot-Casting-details").hide();
    $("#imdb-details-info").hide();
    $("#others-details").show();
  });

  $(".main-title").click(() => {
    $("#main").show();
    $("#search_result").hide();
  });

  $("#searchByTitle").click((e) => {
    e.preventDefault();
    let title = $("#title").val();
    if (typeof title === "undefined" || title == "")
      alert("'title' is compulsory.")
    else
      getResponse(title, 1);
  });

  $("#searchByTitleAndYear").click((e) => {
    e.preventDefault();

    if ($('#title-2').val() == '' && $("#year").val() !== '') {
      alert("Title Can't be blank");

    } else if ($('#title-2').val() !== '' && $("#year").val() == '') {
      alert("Year Can't be blank");

    } else if ($('#title-2').val() == '' && $("#year").val() == '') {
      alert("Please fill both Title & Year");

    } else {
      // Taking the value of input and calling function with value as parameter.
      var title = document.getElementById("title-2").value;
      var year = document.getElementById("year").value;
      getResponse(title, year);
    }
  });

  $("#searchByID").click((e) => {
    e.preventDefault();

    let ID = $("#ID").val();

    if (typeof ID === "undefined")
      alert("ID is compulsory.");
    else
      getResponse(ID, 2);
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

        $("#movie-title").text(response.Title);
        $("#movie-Release-year").text(`(${response.Year})`);
        $("#movie-type").text(`(${response.Type})`);
        $("#movie-rating").text(response.Rated);
        
        if(response.Runtime==="N/A")
          $("#movie-runtime").text(response.Runtime);
        else
          $("#movie-runtime").text(minutesToHours());

        $("#movie-release-date").text(` ${response.Released}`);

        if (response.hasOwnProperty("Poster")) {
          $("#movie-poster").attr("src", response.Poster);
          $("#movie-poster-small").attr("src", response.Poster);
        } else {
          $("#movie-poster").attr("src", "img/dummy.jpg");
          $("#movie-poster-small").attr("src", "img/dummy.jpg");
        }

        $("#movie-language").text(` ${response.Language}`);
        $("#movie-genre").text(` ${response.Genre}`);

        $("#movie-plot").text(response.Plot);
        $("#movie-actors").text(response.Actors);
        $("#movie-director").text(response.Director);
        $("#movie-writer").text(response.Writer);

        $("#imdb-id").text(response.imdbID);
        $("#imdb-ratings").text(response.imdbRating);
        $("#imdb-votes").text(response.imdbVotes);
        $("#metascore").text(response.Metascore);

        $("#country").text(response.Country);
        $("#awards").text(response.Awards);
        $("#dvd").text(response.DVD);
        $("#boxoffice").text(response.BoxOffice);
        $("#prouction").text(response.Production);

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

        $(".RatingsTable").empty();
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
      } else {
        $("#search_result").hide();
        $("#Error").show(2000);
      }
    },

    timeout: 5000,

    error: (request, errorType, errorMessage) => {
      if (errorType === "timeout") {
        $(".time-out").show();

      } else {
        console.log("success");
      }
    },

    beforeSend: () => {
      $(".loader").show();
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