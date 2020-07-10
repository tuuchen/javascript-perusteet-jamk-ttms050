// Muuttujat
var arr = [11, 22, 33, 44];
var tulosrivit = document.getElementById("tulosrivit");
var summa = null;
var ka = null;
var lkm = null;

// Loopataan tulosrivit
for (var i = 0; i < arr.length; i++) {
  tulosrivit.innerHTML += "taulukko[" + i + "] = " + arr[i] + "<br>";
}

// Lasketaan summa sekä lukumäärä
for (var j of arr) {
  summa += j;
  lkm++;
}

// Keskiarvo
ka = summa / lkm;

// Osoitetaan arvot HTML:ään
document.getElementById("eka").innerHTML = "[" + arr + "]";
document.getElementById("lkm").innerHTML = lkm;
document.getElementById("summa").innerHTML = summa;
document.getElementById("ka").innerHTML = ka;