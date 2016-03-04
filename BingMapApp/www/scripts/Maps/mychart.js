
//var randomScalingFactor = function () { return Math.round(Math.random() * 100) };
//var TTbarchartfillcolor = "rgba(40, 149, 205,0.5)",
//    TTbarchartstrokeColor = "rgba(40, 149, 205,0.8)",
//    TTbarcharthighlightFill = "rgba(40, 149, 205,5)",
//    TTbarcharthighlightStroke = "rgba(40, 149, 205,1)";
//var ATbarchartfillcolor = "rgba(151, 203, 226,0.5)",
//    ATbarchartstrokeColor = "rgba(151, 203, 226,0.8)",
//    ATbarcharthighlightFill = "rgba(151, 203, 226,0.75)",
//    ATbarcharthighlightStroke = "rgba(151, 203, 226,1)";

var TTbarchartfillcolor = "rgba(149,26,10,0.75)",
    TTbarchartstrokeColor = "rgba(149,26,10,0.8)",
    TTbarcharthighlightFill = "rgba(149,26,10,5)",
    TTbarcharthighlightStroke = "rgba(149,26,10,1)";
var ATbarchartfillcolor = "rgba(89,171,86,0.75)",
    ATbarchartstrokeColor = "rgba(89,171,86,0.8)",
    ATbarcharthighlightFill = "rgba(89,171,86,5)",
    ATbarcharthighlightStroke = "rgba(89,171,86,1)"; 


var TTLinechartfillcolor = "rgba(40, 149, 205,0.2)",
    TTLinechartstrokeColor = "rgba(40, 149, 205,1)",
    TTLinechartpointcolor = "rgba(40, 149, 205,1)",
    TTLinechartpointstrokecolor = "#fff",
    TTLinechartpointHighlightFill = "#fff",
    TTLinechartpointHighlightStroke = "rgba(40, 149, 205,1)";
var ATLinechartfillcolor = "rgba(151, 203, 226,0.2)",
    ATLinechartstrokeColor = "rgba(151, 203, 226,1)",
    ATLinechartpointcolor = "rgba(151, 203, 226,1)",
    ATLinechartpointstrokecolor = "#fff",
    ATLinechartpointHighlightFill = "#fff",
    ATLinechartpointHighlightStroke = "rgba(151, 203, 226,1)";

var Q1Labels = ["January", "February", "March"],
    Q2Labels = ["April", "May", "June"],
    Q3Labels = ["July", "August", "September"],
    Q4Labels = ["October", "November", "December"];
var Q1TTdata = [65, 59, 60],
    Q1ATdata = [70, 60, 40],
    Q2TTdata = [80, 90, 85],
    Q2ATdata = [68, 100, 60],
    Q3TTdata = [65, 59, 80],
    Q3ATdata = [28, 70, 40],
    Q4TTdata = [105, 70, 90],
    Q4ATdata = [100, 80, 90];

var barChartDataQ1 = {
    labels: ["Jan", "Feb", "Mar","Apr","May","Jun"],
    datasets: [
        {

            label: "Projected Revenue",
            fillColor: TTbarchartfillcolor,
            strokeColor: TTbarchartstrokeColor,
            highlightFill: TTbarcharthighlightFill,
            highlightStroke: TTbarcharthighlightStroke,
            data: [0, 0, 0, 0, 0, 0]
        },
        {
            label: "Actual Revenue",
            fillColor: ATbarchartfillcolor,
            strokeColor: ATbarchartstrokeColor,
            highlightFill: ATbarcharthighlightFill,
            highlightStroke: ATbarcharthighlightStroke,
            data: [1161419, 1096418, 1111092, 1096418, 1102586, 1108754]
        },

    ]

}

var barChartDataQ2 = {
    labels: ["April", "May", "June"],
    datasets: [
        {
            label: "Projected Revenue",
            fillColor: TTbarchartfillcolor,
            strokeColor: TTbarchartstrokeColor,
            highlightFill: TTbarcharthighlightFill,
            highlightStroke: TTbarcharthighlightStroke,
            data: [80, 90, 85]
        },
        {
            label: "Actual Revenue",
            fillColor: ATbarchartfillcolor,
            strokeColor: ATbarchartstrokeColor,
            highlightFill: ATbarcharthighlightFill,
            highlightStroke: ATbarcharthighlightStroke,
            data: [68, 100, 60]
        }
    ]

}

var barChartDataQ3 = {
    labels: ["July", "August", "September"],
    datasets: [
        {
            label: "Projected Revenue",
            fillColor: TTbarchartfillcolor,
            strokeColor: TTbarchartstrokeColor,
            highlightFill: TTbarcharthighlightFill,
            highlightStroke: TTbarcharthighlightStroke,
            data: [65, 59, 80]
        },
        {
            label: "Actual Revenue",
            fillColor: ATbarchartfillcolor,
            strokeColor: ATbarchartstrokeColor,
            highlightFill: ATbarcharthighlightFill,
            highlightStroke: ATbarcharthighlightStroke,
            data: [28, 70, 40]
        }
    ]

}

var barChartDataQ4 = {
    labels: ["October", "November", "December"],
    datasets: [
        {
            label: "Projected Revenue",
            fillColor: TTbarchartfillcolor,
            strokeColor: TTbarchartstrokeColor,
            highlightFill: TTbarcharthighlightFill,
            highlightStroke: TTbarcharthighlightStroke,
            data: [105, 70, 90]
        },
        {
            label: "Actual Revenue",
            fillColor: ATbarchartfillcolor,
            strokeColor: ATbarchartstrokeColor,
            highlightFill: ATbarcharthighlightFill,
            highlightStroke: ATbarcharthighlightStroke,
            data: [100, 80, 90]
        }
    ]

}

var linechartdataQ1 = {
    labels: Q1Labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: TTLinechartfillcolor,
            strokeColor: TTLinechartstrokeColor,
            pointColor: TTLinechartpointcolor,
            pointStrokeColor: TTLinechartpointstrokecolor,
            pointHighlightFill: TTLinechartpointHighlightFill,
            pointHighlightStroke: TTLinechartpointHighlightStroke,
            data: Q1TTdata
        },
        {
            label: "My Second dataset",
            fillColor: ATLinechartfillcolor,
            strokeColor: ATLinechartstrokeColor,
            pointColor: ATLinechartpointcolor,
            pointStrokeColor: ATLinechartpointstrokecolor,
            pointHighlightFill: ATLinechartpointHighlightFill,
            pointHighlightStroke: ATLinechartpointHighlightStroke,
            data: Q1ATdata
        }
    ]
};

var linechartdataQ2 = {
    labels: Q2Labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: TTLinechartfillcolor,
            strokeColor: TTLinechartstrokeColor,
            pointColor: TTLinechartpointcolor,
            pointStrokeColor: TTLinechartpointstrokecolor,
            pointHighlightFill: TTLinechartpointHighlightFill,
            pointHighlightStroke: TTLinechartpointHighlightStroke,
            data: Q2TTdata
        },
        {
            label: "My Second dataset",
            fillColor: ATLinechartfillcolor,
            strokeColor: ATLinechartstrokeColor,
            pointColor: ATLinechartpointcolor,
            pointStrokeColor: ATLinechartpointstrokecolor,
            pointHighlightFill: ATLinechartpointHighlightFill,
            pointHighlightStroke: ATLinechartpointHighlightStroke,
            data: Q2ATdata
        }
    ]
};

var linechartdataQ3 = {
    labels: Q3Labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: TTLinechartfillcolor,
            strokeColor: TTLinechartstrokeColor,
            pointColor: TTLinechartpointcolor,
            pointStrokeColor: TTLinechartpointstrokecolor,
            pointHighlightFill: TTLinechartpointHighlightFill,
            pointHighlightStroke: TTLinechartpointHighlightStroke,
            data: Q3TTdata
        },
        {
            label: "My Second dataset",
            fillColor: ATLinechartfillcolor,
            strokeColor: ATLinechartstrokeColor,
            pointColor: ATLinechartpointcolor,
            pointStrokeColor: ATLinechartpointstrokecolor,
            pointHighlightFill: ATLinechartpointHighlightFill,
            pointHighlightStroke: ATLinechartpointHighlightStroke,
            data: Q3ATdata
        }
    ]
};

var linechartdataQ4 = {
    labels: Q4Labels,
    datasets: [
        {
            label: "My First dataset",
            fillColor: TTLinechartfillcolor,
            strokeColor: TTLinechartstrokeColor,
            pointColor: TTLinechartpointcolor,
            pointStrokeColor: TTLinechartpointstrokecolor,
            pointHighlightFill: TTLinechartpointHighlightFill,
            pointHighlightStroke: TTLinechartpointHighlightStroke,
            data: Q4TTdata
        },
        {
            label: "My Second dataset",
            fillColor: ATLinechartfillcolor,
            strokeColor: ATLinechartstrokeColor,
            pointColor: ATLinechartpointcolor,
            pointStrokeColor: ATLinechartpointstrokecolor,
            pointHighlightFill: ATLinechartpointHighlightFill,
            pointHighlightStroke: ATLinechartpointHighlightStroke,
            data: Q4ATdata
        }
    ]
};


var options = {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines: true,

    //String - Colour of the grid lines
    scaleGridLineColor: "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth: 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve: true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension: 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot: true,

    //Number - Radius of each point dot in pixels
    pointDotRadius: 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth: 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius: 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke: true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth: 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill: true,

    //String - A legend template
    legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};
var highestrevenue = null,
    lowestrevenue = null,
    averagerevenue = null,
    highesttargetedrevenue = null,
    lowesttargetedrevenue = null,
    averagetargetedrevenue = null;

window.onload = function () {
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.canvas.width = "250";
    ctx.canvas.height = "200";

    var ctx2 = document.getElementById("canvas2").getContext("2d");
    //ctx2.canvas2.width = "300";
    //ctx2.canvas2.height = "300";

    window.myBar = new Chart(ctx).Bar(barChartDataQ1, {
        responsive: false
    });
    window.myBar = new Chart(ctx2).Bar(barChartDataQ1, {
        responsive: false
    });
    highestrevenue = document.getElementById('highestrevenue');
    //lowestrevenue = document.getElementById('lowestrevenue');
    //averagerevenue = document.getElementById('averagerevenue');

   // highesttargetedrevenue = document.getElementById('highestrevenuetargeted');
   // lowesttargetedrevenue = document.getElementById('lowestrevenuetargeted');
    //averagetargetedrevenue = document.getElementById('averagerevenuetargeted');

    var arrayq1 = barChartDataQ1.datasets[0].data;
    highestrevenue.innerHTML = "$ " + Math.max.apply(Math, arrayq1);
  //  lowestrevenue.innerHTML = "$ " + Math.min.apply(Math, arrayq1);

    var total = arrayq1.reduce(function (a, b) {
        return a + b;
    });

    //averagerevenue.innerHTML = "$ " + Math.round(total / arrayq1.length);

    var arraytargetedrevenue = barChartDataQ1.datasets[1].data;
  //  highesttargetedrevenue.innerHTML = "$ " + Math.max.apply(Math, arraytargetedrevenue);
  //  lowesttargetedrevenue.innerHTML = "$ " + Math.min.apply(Math, arraytargetedrevenue);

    total = arraytargetedrevenue.reduce(function (a, b) {
        return a + b;
    });

  // averagetargetedrevenue.innerHTML = "$ " + Math.round(total / arraytargetedrevenue.length);
}

$(document).ready(function () {

    $("#firstQ").click(function () {
        var typeOfCart = $("input:radio[name='chart']:checked").val();
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = "300";
        ctx.canvas.height = "300";

        if (typeOfCart != 'Line') {
            window.myBar = new Chart(ctx).Bar(barChartDataQ1, {
                responsive: false
            });
        }
        else {
            new Chart(ctx).Line(linechartdataQ1, {
                bezierCurve: false
            });
        }

        //this.style.backgroundColor = "red";
        this.style.font.fontcolor = "black";
        highestrevenue = document.getElementById('highestrevenue');
        lowestrevenue = document.getElementById('lowestrevenue');
        averagerevenue = document.getElementById('averagerevenue');
        var arrayq1 = barChartDataQ1.datasets[0].data;
        highestrevenue.innerHTML = "$ " + Math.max.apply(Math, arrayq1);
        lowestrevenue.innerHTML = "$ " + Math.min.apply(Math, arrayq1);

        var total = arrayq1.reduce(function (a, b) {
            return a + b;
        });

        averagerevenue.innerHTML = "$ " + Math.round(total / arrayq1.length);

        var arraytargetedrevenue = barChartDataQ1.datasets[1].data;
        highesttargetedrevenue.innerHTML = "$ " + Math.max.apply(Math, arraytargetedrevenue);
        lowesttargetedrevenue.innerHTML = "$ " + Math.min.apply(Math, arraytargetedrevenue);

        total = arraytargetedrevenue.reduce(function (a, b) {
            return a + b;
        });

        averagetargetedrevenue.innerHTML = "$ " + Math.round(total / arraytargetedrevenue.length);
    });
    $("#secondQ").click(function () {
        var typeOfCart = $("input:radio[name='chart']:checked").val();
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = "300";
        ctx.canvas.height = "300";
        if (typeOfCart != 'Line') {
            window.myBar = new Chart(ctx).Bar(barChartDataQ2, {
                responsive: false
            });
        }
        else {
            new Chart(ctx).Line(linechartdataQ2, {
                bezierCurve: false
            });
        }

        highestrevenue = document.getElementById('highestrevenue');
        lowestrevenue = document.getElementById('lowestrevenue');
        averagerevenue = document.getElementById('averagerevenue');
        var arrayq1 = barChartDataQ2.datasets[0].data;
        highestrevenue.innerHTML = "$ " + Math.max.apply(Math, arrayq1);
        lowestrevenue.innerHTML = "$ " + Math.min.apply(Math, arrayq1);

        var total = arrayq1.reduce(function (a, b) {
            return a + b;
        });

        averagerevenue.innerHTML = "$ " + Math.round(total / arrayq1.length);

        var arraytargetedrevenue = barChartDataQ2.datasets[1].data;
        highesttargetedrevenue.innerHTML = "$ " + Math.max.apply(Math, arraytargetedrevenue);
        lowesttargetedrevenue.innerHTML = "$ " + Math.min.apply(Math, arraytargetedrevenue);

        total = arraytargetedrevenue.reduce(function (a, b) {
            return a + b;
        });

        averagetargetedrevenue.innerHTML = "$ " + Math.round(total / arraytargetedrevenue.length);
    });
    $("#thirdQ").click(function () {
        var typeOfCart = $("input:radio[name='chart']:checked").val();
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = "300";
        ctx.canvas.height = "300";
        if (typeOfCart != 'Line') {
            window.myBar = new Chart(ctx).Bar(barChartDataQ3, {
                responsive: false
            });
        }
        else {
            new Chart(ctx).Line(linechartdataQ3, {
                bezierCurve: false
            });
        }

        highestrevenue = document.getElementById('highestrevenue');
        lowestrevenue = document.getElementById('lowestrevenue');
        averagerevenue = document.getElementById('averagerevenue');
        var arrayq1 = barChartDataQ3.datasets[0].data;
        highestrevenue.innerHTML = "$ " + Math.max.apply(Math, arrayq1);
        lowestrevenue.innerHTML = "$ " + Math.min.apply(Math, arrayq1);

        var total = arrayq1.reduce(function (a, b) {
            return a + b;
        });

        averagerevenue.innerHTML = "$ " + Math.round(total / arrayq1.length);

        var arraytargetedrevenue = barChartDataQ3.datasets[1].data;
        highesttargetedrevenue.innerHTML = "$ " + Math.max.apply(Math, arraytargetedrevenue);
        lowesttargetedrevenue.innerHTML = "$ " + Math.min.apply(Math, arraytargetedrevenue);

        total = arraytargetedrevenue.reduce(function (a, b) {
            return a + b;
        });

        averagetargetedrevenue.innerHTML = "$ " + Math.round(total / arraytargetedrevenue.length);
    });
    $("#fourthQ").click(function () {
        var typeOfCart = $("input:radio[name='chart']:checked").val();
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.canvas.width = "300";
        ctx.canvas.height = "300";
        if (typeOfCart != 'Line') {
            window.myBar = new Chart(ctx).Bar(barChartDataQ4, {
                responsive: false
            });
        }
        else {
            new Chart(ctx).Line(linechartdataQ4, {
                bezierCurve: false
            });
        }

        highestrevenue = document.getElementById('highestrevenue');
        lowestrevenue = document.getElementById('lowestrevenue');
        averagerevenue = document.getElementById('averagerevenue');
        var arrayq1 = barChartDataQ4.datasets[0].data;
        highestrevenue.innerHTML = "$ " + Math.max.apply(Math, arrayq1);
        lowestrevenue.innerHTML = "$ " + Math.min.apply(Math, arrayq1);

        var total = arrayq1.reduce(function (a, b) {
            return a + b;
        });

        averagerevenue.innerHTML = "$ " + Math.round(total / arrayq1.length);

        var arraytargetedrevenue = barChartDataQ4.datasets[1].data;
        highesttargetedrevenue.innerHTML = "$ " + Math.max.apply(Math, arraytargetedrevenue);
        lowesttargetedrevenue.innerHTML = "$ " + Math.min.apply(Math, arraytargetedrevenue);

        total = arraytargetedrevenue.reduce(function (a, b) {
            return a + b;
        });

        averagetargetedrevenue.innerHTML = "$ " + Math.round(total / arraytargetedrevenue.length);
    });
});

function selectedgraph() {
    var typeOfCart = $("input:radio[name='chart']:checked").val();
    var ctx = document.getElementById("canvas").getContext("2d");
    ctx.canvas.width = "300";
    ctx.canvas.height = "300";
    if (typeOfCart != 'Line') {
        window.myBar = new Chart(ctx).Bar(barChartDataQ1, {
            responsive: false
        });
    }
    else {
        new Chart(ctx).Line(linechartdataQ1, {
            bezierCurve: false
        });
    }
}
