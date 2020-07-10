window.addEventListener("DOMContentLoaded", (event) => {
  loadJSON();
});

function loadJSON() {
  ajax("talotiedot.json", (response) => {
    var JSONObject = JSON.parse(response);
    var talot = new Array();
    talot = JSONObject.talot;
    for (var i = 0; i < talot.length; i++) {
      naytaTalo(i, talot);
    }
  });
}

function ajax(url, fn) {
  var req;
  if (window.XMLHttpRequest) {
    req = new XMLHttpRequest();
  } else {
    req = new ActiveXObject("Microsoft.XMLHTTP");
  }
  req.onreadystatechange = () => {
    if (req.readyState == 4 && req.status == 200) {
      fn(req.responseText);
    }
  };
  req.open("GET", url, true);
  req.send();
}

function naytaTalo(i, talot) {
  var html =
    `<div class="card mb-3">
  <h5 class="card-header">
    <div class="row">
      <div class="col">` +
    talot[i].osoite +
    `</div>
      <div class="col">` +
    talot[i].hinta +
    `</div>
    </div>
  </h5>
  <div class="card-body">
    <div class="row">
      <div class="col">
        <img data-toggle="modal"
        data-target="#exampleModal` +
    [i] +
    `" src="` +
    talot[i].kuva +
    `" class="img-fluid card-image" />
      </div>
      <div class="col">
        <h5 class="card-title">` +
    talot[i].koko +
    `</h5>
        <p class="card-text">
         ` +
    talot[i].kuvaus +
    `
        </p>
      </div>
    </div>
  </div>
<div
  class="modal fade"
  id="exampleModal` +
    [i] +
    `"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel` +
    [i] +
    `">` +
    talot[i].osoite +
    `</h5>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body d-flex justify-content-center">
      <img src="` +
    talot[i].kuva +
    `" class="img-fluid w-100" />
      </div>
    </div>
  </div>
</div>
</div>`;
  var content = document.getElementById("content");
  content.innerHTML += html;
}
