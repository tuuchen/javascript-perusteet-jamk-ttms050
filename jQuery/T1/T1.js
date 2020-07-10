$(() => {
  $("#myForm").submit((e) => {
    e.preventDefault();
    $(".tulosrivi").show();
    $("#tulos").text(+$("#luku1").val() + +$("#luku2").val());
  });
});
