/* This file is responsible for all basic operations like enable or disable the sections*/
$(document).ready(() => {
	
  /*On first load, show 'main' section with focus on 'title' textbox and hide all other section*/ 
  $("#main").show();
  $(".loader").hide();
  $(".time-out").hide();
  $("#search_result").hide();
  $("#Error").hide();
  $("#title").focus();

  /*When search-result section will be shown, only first tab is active initially*/
  $("#Plot-Casting-details").show();
  $("#imdb-details-info").hide();
  $("#others-details").hide();

  /*Making a tab 'active' and others 'deactive'- on click event- by using 'active' class*/
  $(".tab").click(function() {
    $(".tab").removeClass("active");
    $(this).addClass("active");
  });

  /*Clicking first tab*/
  $("#Plot-Casting").click(() => {
    $("#Plot-Casting-details").show();
    $("#imdb-details-info").hide();
    $("#others-details").hide();
  });

  /*Clicking second tab*/
  $("#imdb-details").click(() => {
    $("#Plot-Casting-details").hide();
    $("#imdb-details-info").show();
    $("#others-details").hide();
  });

  /*Clicking third tab*/
  $("#others").click(() => {
    $("#Plot-Casting-details").hide();
    $("#imdb-details-info").hide();
    $("#others-details").show();
  });
  
  /*Reload the entire page and skips to Main page to remove previously entered data,
  on cliking the title of the navigation bar*/
  $(".main-title").click(() => {
    location.reload();
  });

  //Reset title and year fields
  $("#TitleAndYearReset").click((e) => {
    e.preventDefault();
    $("#title").val('');
    $("#year").val('');
  });

  //Reset ID field
  $("#ResetIDField").click((e) => {
    e.preventDefault();
    $("#ID").val('');

  });
});