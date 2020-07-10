function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var dt = event.dataTransfer;
  var files = dt.files;
  handleFiles(files);
}

function handleFiles(files) {
  files = [...files];
  files.forEach(previewFile);
}

function removeImage(id) {
  $('#exampleModal' + id).modal('hide');
  document.getElementById(id).remove();
  document.getElementById('exampleModal' + id).remove();
}

function previewFile(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = function () {
    var img = document.createElement('img');
    img.src = reader.result;
    var id = Date.now();
    var html =
      `<img id="` +
      id +
      `" data-toggle="modal"
        data-target="#exampleModal` +
      id +
      `" src="` +
      img.src +
      `" class="img-fluid img mb-1" />
  <div
  class="modal fade"
  id="exampleModal` +
      id +
      `"
  tabindex="-1"
  role="dialog"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel` +
      id +
      `">Uploaded: ` +
      new Date() +
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
      img.src +
      `" class="img-fluid w-100" />
      </div>
      <div class="modal-footer">
        <button type="button" onclick="removeImage(` +
      id +
      `)" class="btn btn-danger">Remove image</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
  </div>
  </div>`;
    let content = document.getElementById('divToDrop');
    content.innerHTML += html;
  };
}
