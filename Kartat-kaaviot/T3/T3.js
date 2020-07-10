$(() => {
  drawChart(ctx, chartType, data, options);
});

$('#ford').on('click', (e) => {
  addCar(myChart, 0);
});

$('#opel').on('click', (e) => {
  addCar(myChart, 1);
});

$('#toyota').on('click', (e) => {
  addCar(myChart, 2);
});

$('#reset').on('click', (e) => {
  nollaa(myChart);
});

var ctx = 'myChart';
var chartType = 'bar';
var data = {
  labels: ['Ford', 'Opel', 'Toyota'],
  datasets: [
    {
      label: 'Lukumäärä (kpl)',
      data: [7, 3, 8],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
var options = {
  // Hide label
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    ],
  },
};

function drawChart(ctx, chartType, data, options) {
  myChart = new Chart(ctx, {
    type: chartType,
    data: data,
    options: options,
  });
}

function addCar(chart, id) {
  chart.data.datasets[0].data[id] += 1;
  chart.update();
}

function nollaa(chart) {
  chart.data.datasets[0].data[0] = 0;
  chart.data.datasets[0].data[1] = 0;
  chart.data.datasets[0].data[2] = 0;
  chart.update();
}
