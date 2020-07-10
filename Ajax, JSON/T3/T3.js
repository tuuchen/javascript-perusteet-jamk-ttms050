window.addEventListener("DOMContentLoaded", (event) => {
  autocomplete(document.getElementById("myInput"));
});

function ajax(str, cb) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var arr = this.responseText.split(" ");
      cb(arr);
    }
  };
  xmlhttp.open(
    "GET",
    "https://student.labranet.jamk.fi/~N0198/ajax-suggest.php?q=" + str,
    true
  );
  xmlhttp.send();
}

function mySubmitFunction(e) {
  e.preventDefault();
  if (e.target[0].value) {
    window.location.href =
      "https://student.labranet.jamk.fi/~N0198/ajax-suggest.php?q=" +
      e.target[0].value;
  }
}

function autocomplete(inp) {
  var arr;
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    ajax(val, (res) => {
      arr = res;
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      this.parentNode.appendChild(a);
      for (i = 0; i < arr.length; i++) {
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          b = document.createElement("DIV");
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function (e) {
            window.location.href =
              "https://student.labranet.jamk.fi/~N0198/ajax-suggest.php?q=" +
              this.getElementsByTagName("input")[0].value;
          });
          a.appendChild(b);
        }
      }
    });
  });

  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) {
          inp.value = x[currentFocus].children[1].value;
          closeAllLists();
        }
      }
    } else if (e.keyCode == 27) {
      e.preventDefault();
      e.target.value = "";
      closeAllLists();
    }
  });

  function addActive(x) {
    if (!x) return false;
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
