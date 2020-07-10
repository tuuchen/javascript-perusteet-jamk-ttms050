document.addEventListener('DOMContentLoaded', function (event) {
  drawSweden();
  drawGuyana();
});

function drawSweden() {
  var canvas = document.getElementById('sweden');
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 160, canvas.width, canvas.height / 5);
  ctx.fillStyle = 'yellow';
  ctx.fillRect(200, 0, canvas.width / 7, canvas.height);
}

function drawGuyana() {
  var canvas = document.getElementById('guyana');
  var wid = canvas.width;
  var hei = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = '#009E49';
  ctx.fillRect(0, 0, wid, hei);
  drawCanvas(ctx, 0, 0, wid, hei / 2, 0, hei, '#ffffff');
  drawCanvas(ctx, 0, 10, wid - 25, hei / 2, 0, hei - 10, '#FCD116');
  drawCanvas(ctx, 0, 0, wid / 2, hei / 2, 0, hei, '#000000');
  drawCanvas(ctx, 0, 10, wid / 2 - 16, hei / 2, 0, hei - 10, '#CE1126');
}

function drawCanvas(ctx, x1, y1, x2, y2, x3, y3, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.fill();
}
