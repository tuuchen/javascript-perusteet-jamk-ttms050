$(() => {
  $("#firstHeadline").click(() => {
    $("#collapseOne").slideToggle();
  });

  $("#secondHeadline").click(() => {
    $("#collapseTwo").slideToggle();
  });

  $("#thirdHeadline").click(() => {
    $("#collapseThree").slideToggle();
  });

  $("#fourthHeadline").click(() => {
    $("#collapseFour").slideToggle();
  });
});
