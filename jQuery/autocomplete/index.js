$(() => {
  $("#myInput").autocomplete({
    source: (request, response) => {
      $.ajax({
        url:
          "https://student.labranet.jamk.fi/~N0198/ajax-suggest.php?q=" +
          $("#myInput").val(),
        success: (data) => {
          data = data.split(" ");
          response(data);
        },
      });
    },
  });
});

function mySubmitFunction(e) {
  e.preventDefault();
  if (e.target[0].value) {
    window.location.href =
      "https://student.labranet.jamk.fi/~N0198/ajax-suggest.php?q=" +
      e.target[0].value;
  }
}
