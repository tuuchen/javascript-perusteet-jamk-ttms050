$(() => {
  $(".nappi").on("click", (e) => {
    e.target.parentElement.remove();
  });

  $("form").submit(() => {
    let todo = $("#input").val();
    let li = $(
      "<li class='list-group-item limit'>" +
        todo +
        '<button class="nappi right">X</button></li>'
    );
    $("ul").append(li);
    $(".nappi").on("click", (e) => {
      e.target.parentElement.remove();
    });
    $("#input").val("");
    $("#input").focus();
    return false;
  });
});

function removeTodos() {
  $("#list").text("");
}
