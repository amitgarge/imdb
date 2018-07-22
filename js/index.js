$(document).ready(() => {
	
  $("#main").show();
  $(".loader").hide();
  $(".time-out").hide();
  $("#search_result").hide();
  $("#Error").hide();
  $("#title").focus();

  $("#Plot-Casting-details").show();
  $("#imdb-details-info").hide();
  $("#others-details").hide();

  $(".tab").click(function() {
    $(".tab").removeClass("active");
    $(this).addClass("active");
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
  
  // Reload the entire page and skips to Main page to remove previously entered data.
  $(".main-title").click(() => {
    location.reload();
  });

  $(".main-title-error").click(() => {
    $("#main").show();
    $("#Error").hide();
  });
});