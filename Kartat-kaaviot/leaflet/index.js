var mymap = L.map('mapid').setView([62.242561, 25.747499], 14);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1IjoidHV1Y2hlbiIsImEiOiJja2NlbDRnZWgwNmtjMnNwMHdlbmdzbHIzIn0.YN56d1NOXbAboYE-7o8ORg',
  }
).addTo(mymap);

var marker = L.marker([62.242561, 25.747499]).addTo(mymap);

var circle = L.circle([62.24231, 25.735109], {
  color: 'yellow',
  fillColor: '#FFFFCC',
  fillOpacity: 0.5,
  radius: 380,
}).addTo(mymap);

var rectangle = L.rectangle([
  [62.239252, 25.751803],
  [62.237843, 25.751508],
  [62.237823, 25.75559],
  [62.239102, 25.755311],
]).addTo(mymap);

marker.bindPopup('<b>Hello!</b><br>I am the center of Jyväskylä!').openPopup();
circle.bindPopup('<b>Harjun EK</b>');
rectangle.bindPopup('<b>MM-ralli - Kilpailukeskus</b>');

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(mymap);
}

mymap.on('click', onMapClick);
