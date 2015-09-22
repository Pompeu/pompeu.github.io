(function(){
var load = document.querySelector('.ajax');
var table = null;
var chart = null;

google.load("visualization", "1", {packages:["bar"]});
google.setOnLoadCallback(drawStuff);

function drawStuff() {
  'use strict';
  var data = new google.visualization.arrayToDataTable([
    ['Testes', 'NODEJS','PYTHON', 'RUBY' , 'PHP'],    
    ['Transaction rate per seconde', 1650.5,1087.82, 1066.5 , 788.82],
]);

var options = {
  width: 900,
  chart: {
    title: 'NodeJS VS Ruby VS PHP Vs Flask with Siege',
    subtitle: 'Testing nodeJS(Restfy) vs Ruby(Sinatra) vs Php(slin)'
  },
  series: {
    0: { axis: 'distance' }, // Bind series 0 to an axis named 'distance'.
  },
  axes: {
    y: {
      distance: {label: 'Transactions Per Second'}, // Left y-axis.
      brightness: {side: 'right', label: 'magnitude'} // Right y-axis.
    }
  }
};

chart = new google.charts.Bar(document.getElementById('dual_y_div'));
  chart.draw(data, options);
}

google.load("visualization", "1", {packages:["table"]});
google.setOnLoadCallback(drawTable);

function drawTable() {
  'use strict';
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Linguagem');
  data.addColumn('number', 'Transactions');
  data.addColumn('number', 'Elapsed time');
  data.addColumn('string', 'Transaction rate');
  data.addColumn('number', 'Successful');
  data.addColumn('number', 'Longest transaction');
  data.addColumn('number', 'Shortest transaction');
  data.addRows([
    ['NODEJS' , 32556, 19.72, '1650.5 trans/s', 32556,  3.10, 0.00],
    ['PYTHON'   , 21100, 19.40, '1087.82 trans/s', 21100, 7.32, 0.00],
    ['RUBY'   , 20753, 19.45, '1066.5 trans/s', 20753, 15.12, 0.00],
    ['PHP'   , 15524, 19.68, ' 788.82 trans/s', 15524, 14.3, 0.00],
  ]);

  table = new google.visualization.Table(document.getElementById('table_div'));
  if(table){
    load.style.display = "none";
  }
  table.draw(data, {showRowNumber: true});
} 



})();
