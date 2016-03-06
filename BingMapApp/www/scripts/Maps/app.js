/// <reference path="../../mapFrame.html" />
/// <reference path="../../mapFrame.html" />
/// <reference path="../../Views/ManagersTiles.html" />
/// <reference path="../../Views/ManagersTiles.html" />
/// <reference path="../angular.min.js" />

var map = null;
var InfoBoxEntity = null;
var PushPinsEntity = null;
var mapsdata = [
 {
     "Revenue": 500,
     "Lat": 28.633,
     "Lon": 77.219,
     "Title": "New Delhi, India",
     "Description": "Capital and one of the Historical place of India",
     "name": "Sajal Mitra"
 },
{
    "Revenue": 450,
    "Lat": 51.48549938466352,
    "Lon": -0.10674425522154696,
    "Title": "London, UK",
    "Description": "Beautiful place of England"
},
{
    "Revenue": 445,
    "Lat": 55.752478073030616,
    "Lon": 37.624426399075325,
    "Title": "Moscow, Russia",
    "Description": "Revolutionary place and Capital of Russia"
},
{
    "Revenue": 510,
    "Lat": 30.032022566346278,
    "Lon": 31.23587659438783,
    "Title": "Cairo, Egypt",
    "Description": "A Place of Mysterious Pyramids"
},
{
    "Revenue": 400,
    "Lat": -23.04332469099961,
    "Lon": -43.17315050522155,
    "Title": "Rio de Janeiro, Brazil",
    "Description": "Beautiful place of Brazil"
}
]

function LoadMap() {
    map = new Microsoft.Maps.Map(document.getElementById('MyMap'), {
        credentials: "AsIc5m_UvaEs-RPaTrw0XRyl9nVaDCPMCqxjdAi_1eQBQXYr8iFtEZ_ttfwwu_7v",
        mapTypeId: Microsoft.Maps.MapTypeId.road
    });

    PushPinsEntity = new Microsoft.Maps.EntityCollection();
    map.entities.push(PushPinsEntity);

    InfoBoxEntity = new Microsoft.Maps.EntityCollection();
    map.entities.push(InfoBoxEntity);

    map.setView({
        center: new Microsoft.Maps.Location(47.27197080559039, 1.303472656250002),
        zoom: 2
    });

    //var strJSON = document.getElementById('txtJSON');

    var strJSON = mapsdata;
    if (strJSON.length == 0) {
        alert('Please provide pushpin data in JSON format');
        return;
    }

    try {
        //var data = JSON.parse(strJSON);
        var data = strJSON;

        SetPushPins(data);
        strJSON.value = "";
        document.getElementById("Loading").style.display = "none";
    }
    catch (ex) {
        alert('ERROR: Please provide valid JSON data');
    }
}

function SetPushPins(PushPinData) {
    if (PushPinData.length == 0)
        return;


    for (var i = 0; i < PushPinData.length; i++) {
        var Loc = new Microsoft.Maps.Location(PushPinData[i].Lat, PushPinData[i].Lon);
        var Pushpin = new Microsoft.Maps.Pushpin(Loc);

        if (PushPinData[i].Revenue > 450) {
            Pushpin = new Microsoft.Maps.Pushpin(Loc, { icon: 'images/Green_pin.png', width: 50, height: 50, draggable: true });
        }
        else {
            Pushpin = new Microsoft.Maps.Pushpin(Loc, { icon: 'images/Red_pin.png', width: 50, height: 50, draggable: true });
        }
        Pushpin.Title = PushPinData[i].Title;
        Pushpin.Description = PushPinData[i].Description;
        Pushpin.Revenue = PushPinData[i].Revenue;

        //$("#name").text = PushPinData[i].name;
        //$("#name").html = PushPinData[i].name;
        $("#name").text(PushPinData[i].name);

        var InfoBox = new Microsoft.Maps.Infobox(Loc, { visible: false, offset: new Microsoft.Maps.Point(0, 30) });

        Microsoft.Maps.Events.addHandler(Pushpin, 'click', function (e) {
            //window.location.href = "Views/ManagersTiles.html";
            var url = "Views/ManagersTiles.html";

            CORSMsg.SendMsg(url, window.parent);

            //$("#backpagediv").show();
            //InfoBox.setLocation(e.target.getLocation());



            //$("#detailslocation").modal("toggle");


            //InfoBox.setOptions({
            //    visible: true,
            //    title: e.target.Title,
            //    description: e.target.Description,
            //    name: e.target.name
            //});
        });

        InfoBoxEntity.push(InfoBox);
        PushPinsEntity.push(Pushpin);
    }
}

//$(document).ready(function () {
//    $("#backpagediv").show();
//var $table = $('table.quarters'),
//    $bodyCells = $table.find('tbody tr:first').children(),
//    colWidth;

//// Adjust the width of thead cells when window resizes
//$(window).resize(function () {
//    // Get the tbody columns width array
//    colWidth = $bodyCells.map(function () {
//        return $(this).width();
//    }).get();

//    // Set the width of thead columns
//    $table.find('thead tr').children().each(function (i, v) {
//        $(v).width(colWidth[i]);
//    });
//}).resize(); // Trigger resize handler
//});

var app = angular.module("myapp", []);

app.constant('Serviceurl', 'http://localhost:1515/api');

app.controller('logincntrl', function ($scope, $http, Serviceurl) {
    $scope.authenticated = false;
    $scope.type = 'master';
    $scope.login = function () {
        var emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ($scope.email != undefined) {
            if (emailReg.test($scope.email)) {
                var email = $scope.email;
                var pass = $scope.password;
                document.getElementById("Loading").style.display = "block";
                if (email != "" && pass != "" && email != undefined && pass != undefined) {
                    try {
                        $http.get(Serviceurl + "/authenticate/" + email + "/" + pass + "/" + $scope.type)
                        .success(function (response) {
                            var data = JSON.stringify(response);
                            var result = JSON.parse(data);
                            if (result.length > 0) {
                                document.getElementById("Loading").style.display = "none";
                                var uid = result[0].uid;
                                window.localStorage.setItem("uid", uid);
                                window.location.href = "mapFrame.html";
                            }
                        })
                        .error(function (data, status) {
                            document.getElementById("Loading").style.display = "none";
                        });
                    }
                    catch (e) {
                        document.getElementById("Loading").style.display = "none";
                    }

                }
                else { document.getElementById("Loading").style.display = "none"; }
            } else {
                document.getElementById("Loading").style.display = "none";
            }
        }
    }
});

app.controller('tilescntrl', function ($scope, $http, Serviceurl) {

    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        //slideWidth: 100,
        slideWidth: 1000,
        adaptiveHeight: true,
        ticker: true,
        speed: 42000
    });

    var uid = window.localStorage.getItem("uid");

    var screennum = "screen2";
    $http.get(Serviceurl + "/gettiles/" + screennum + "/" + uid)
    .success(function (response) {
        $scope.tilesnames = response[0].tiles;
    })
    .error();

    $scope.listofaccounts = function () {
        window.location.href = "ListofAccounts.html";
    }
    $scope.listofDMtiles = function () {
        //debugger;
        loadDMS();
    }

    function loadDMS() {
        window.location.href = "ListofDMs.html";
    }

    $scope.listofAccountManagers = function () {
        //debugger;
        window.location.href = "ListofAccountsManger.html";
    }

    $scope.backtoPage = function () {
        window.location.href = "../mapFrame.html";
    }
});

app.controller('accountscntrl', function ($scope, $http, Serviceurl) {
    //debugger
    var uid = window.localStorage.getItem("uid");
    $http.get(Serviceurl + "/getaccounts/" + uid)
    .success(function (response) {
        $scope.managers = response[0].accountslist;
    })
    .error();

    $scope.accountslistnames = function () {
        window.location.href = "DMTilesDisplay.html?listofaccounts=" + $scope.selection;

    }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";

    }

    $scope.selection = [];
    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(dmname);
        }
    }
});

app.controller('DMCntrl', function ($scope, $http, Serviceurl) {
    // debugger;

});

app.controller('AMCntrl', function ($scope, $http, Serviceurl) {
    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        //slideWidth: 100,
        //adaptiveHeight: true,
        slideWidth: 1000,
        ticker: true,
        speed: 42000
    });
    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }
});

app.controller('dmtilescntrl', ['$scope', '$http', '$rootScope', '$location', function ($scope, $http, $rootScope, $location) {

    $('.bxslider').bxSlider({
        minSlides: 1,
        maxSlides: 1,
        //slideWidth: 100,
        slideWidth: 1000,
        //adaptiveHeight: true,
        ticker: true,
        speed: 42000
    });

    var deliverymanagersParameters = getUrlParameter("selectedvalues", $location.absUrl())
    //var selectedvalues = $location.search();

    $scope.dmlist = deliverymanagersParameters;

    var accountsParameters = getUrlParameter("listofaccounts", $location.absUrl());
    //var selectedvalues = $location.search();

    $scope.accountslist = accountsParameters;

    $scope.gotochmparameters = function () {
        window.location.href = "CHMParameters.html";
    }

    $scope.consolidated = function () {
        window.location.href = "Consolidateddata.html";
    }

    $scope.customerSatification = function () {
        window.location.href = "customersatisfaction.html";
    }

    $scope.openRevenue = function () {
        window.location.href = "revenue.html?listofdeliverynames=" + deliverymanagersParameters;
    }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }

}]);

app.controller('CHMParameterCntrl', function ($scope, $http, $location, Serviceurl) {
    window.localStorage.setItem("chmparameter", "");

    $scope.managers = ["Gross", "Onsite", "Offshore"];

    $scope.selection = [];
    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(dmname);
        }
    }

    $scope.gotoCHMCharts = function () {
        window.location.href = "CHMcharts.html?parameter=" + $scope.selection;

        window.localStorage.setItem("chmparameter", $scope.selection);
    }

    $scope.backtoPage = function () {
        window.location.href = "DMTilesDisplay.html";
    }
})

app.controller('consolidatecntrl', function ($scope, $http, Serviceurl) {
    //code 
    $scope.pcsattable = true;
    var uid = window.localStorage.getItem("uid");

    // Current Qtr 
    $http.get(Serviceurl + "/getpulseCurrentQtr/" + uid)
    .success(function (response) {
        console.log(response);
        $scope.data = response[1].Pulse;
    })
    .error();

    $http.get(Serviceurl + "/getpcsatCurrentQtr/" + uid)
    .success(function (response) {
        console.log(response);
        $scope.datapcsat = response[0].PCSAT;
    })
    .error();

    $scope.currentQtr = function () {
        $http.get(Serviceurl + "/getpulseCurrentQtr/" + uid)
    .success(function (response) {
        console.log(response);
        $scope.data = response[1].Pulse;
    })
    .error();

        $http.get(Serviceurl + "/getpcsatCurrentQtr/" + uid)
        .success(function (response) {
            console.log(response);
            $scope.datapcsat = response[0].PCSAT;
        })
        .error();
    }

    $scope.openPCsat = function () {
        $scope.pcsattable = true;
        $scope.pulsetable = false;
    }

    $scope.openpulse = function () {
        $scope.pcsattable = false;
        $scope.pulsetable = true;
    }

    $scope.backtoPage = function () {
        window.location.href = "DMTilesDisplay.html";
    }

    $scope.PrevQtr = function () {
        $http.get(Serviceurl + "/getpulseLastQtr/" + uid)
        .success(function (response) {
            $scope.data = response[1].Pulse;
        }).error();

        $http.get(Serviceurl + "/getpcsatLastQtr/" + uid)
       .success(function (response) {
           $scope.datapcsat = response[0].PCSAT;
       }).error();
    }

    $scope.lasttwoQtrs = function () {
        $http.get(Serviceurl + "/getpcsatLasttwoQtrs/" + uid)
            .success(function (response) {
                $scope.datapcsat = response[0].PCSAT;

            }).error();

        $http.get(Serviceurl + "/getpulseLasttwoQtrs/" + uid)
           .success(function (response) {
               $scope.data = response[1].Pulse;

           }).error();
    }
});

function getCurrentMonthAndYear()
{
    debugger;
    var d = new Date();
    var year=d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10)
    {
        month = "0" + month;
    }
    return year+"-"+month;
}
app.controller('revenuecntrl', function ($scope, $http, $location, Serviceurl) {
    //code     

    function getListMonthNames(type) {
        debugger;
        var currentQuater = getCurrentQuater();
        var label = [];
        //
        if (type == "current") {
            if (currentQuater == 4) {
                label.push("jan", "feb", "mar");
                return label;
            }
            if (currentQuater == 3) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 2) {
                label.push("jul", "aug", "sep");
                return label;
            }
            if (currentQuater == 1) {
                label.push("oct", "nov", "dec");
                return label;
            }
        }
        if (type == "next") {
            if (currentQuater == 4) {
                label.push("apr", "may", "jun");
                return label;
            }
            if (currentQuater == 3) {
                label.push("jan", "feb", "jun");
                return label;
            }
            if (currentQuater == 2) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 1) {
                label.push("jul", "aug", "sep");
                return label;
            }
        }

        if (type == "previous") {
            if (currentQuater == 4) {
                label.push("oct", "nov", "dec");
                return label;
            }
            if (currentQuater == 3) {
                label.push("jul", "aug", "sep");
                return label;
            }
            if (currentQuater == 2) {
                label.push("apr", "may", "jun");
                return label;
            }
            if (currentQuater == 1) {
                label.push("jan", "feb", "mar");
                return label;
            }
        }

        if (type == "lasttwoquaters") {
            if (currentQuater == 4) {

                label.push("jul", "aug", "sep","oct","nov","dec");
                return label;
            }
            if (currentQuater == 3) {
                label.push("apr", "may", "jun", "jul", "aug", "sep");
                return label;
               
            }
            if (currentQuater == 2) {

                label.push("jan", "feb", "mar", "apr", "may", "jun");
                return label;               
            }
            if (currentQuater == 1) {

                label.push("oct", "nov", "dec", "jan", "feb", "mar");
                return label;

            }
        }
       
       
    }

    function DataBind(data) {
        debugger;
        var month = getListMonthNames("current");
        var month1, month2, month3;
        for (var i = 0; i <= 2; i++) {
            
                month1 = data[i][month[0]];
                month2 = data[i][month[1]]
                month3 = data[i][month[2]];
                       
            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('<h4>Actual Revenue</h4>');
            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var totalRevenue = $(totalAmount);
            totalRevenue.html('$ :' + q4);

            tabHeaderr.html(data[i].DMManger);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].DMManger,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month3]
            }
            
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
           
            window.myBar = new Chart(ctx).Bar(barChartData);

        }
    }

    function next(data) {

        var month = getListMonthNames("next");
        var month1, month2, month3;
        for (var i = 0; i <= 2; i++) {
            //debugger;

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];

            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('<h4>Projected Revenue</h4>');
            var totalRevenue = $(totalAmount);
            totalRevenue.html(q4);

            tabHeaderr.html(data[i].DMManger);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].DMManger,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month3]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
    }

    function previous(data) {
        var month = getListMonthNames("previous");
        var month1, month2, month3;

        for (var i = 0; i <= 2; i++) {

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];

            var q4 = data[i].total;
            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var totalAmount = "#totalamount" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('<h4>Actual Revenue</h4>');

            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);
            var totalRevenue = $(totalAmount);
            totalRevenue.html(q4);

            tabHeaderr.html(data[i].DMManger);
            var barChartData = {
                labels: [month[0], month[1], month[2]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].DMManger,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1, month2, month2]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
    }

    function lasttwoquaters(data) {
        debugger;
        var month = getListMonthNames("lasttwoquaters");
        var month1, month2, month3, month4, month5, month6;

        for (var i = 0; i <= 2; i++) {

            var jul, aug, sep, oct, nov, dec, q4;

            month1 = data[i][month[0]];
            month2 = data[i][month[1]]
            month3 = data[i][month[2]];
            month4 = data[i][month[3]];
            month5 = data[i][month[4]];
            month6 = data[i][month[5]];

            var name = "canvas" + (i + 1);
            var tabHeader = "#tabheader" + (i + 1);
            var spantotalRevenue = "#TotalRevenue" + (i + 1);
            var spnTotalRevenue = $(spantotalRevenue);
            spnTotalRevenue.html('<h4>Actual Revenue</h4>');

            var ctx = document.getElementById(name).getContext("2d");
            ctx.canvas.width = "300";
            ctx.canvas.height = "300";

            var tabHeaderr = $(tabHeader);

            tabHeaderr.html(data[i].DMManger);
            var barChartData = {
                labels: [month[0], month[1], month[2], month[3], month[4], month[5]],
                datasets: []
            }
            var datasetobj = {
                label: data[i].DMManger,
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: [month1,month2,month3,month4,month5,month6]
            }
            barChartData.datasets = [];
            barChartData.datasets.push(datasetobj);
            window.myBar = new Chart(ctx).Bar(barChartData, {
                responsive: false
            });

        }
    }
    
    function getCurrentQuater() {
        var d = new Date(); 
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];
        return cq;
    }
  
    function getMonthAndYearBasedOnQuater(currentQuater,type)
    {
        debugger;
        var months = [];
        var years = [];
        var monthAndYear = {};

        if (type == "current") {
            if (currentQuater == 4) {
                months.push(01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(10, 11,12);
                var d = new Date();
                years.push(d.getFullYear() + 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(07,08,09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push[04, 05, 07];
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }
        if (type == "next")
        {         
            if(currentQuater==4)
            {
                months.push(04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear() + 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push[07, 08, 09];
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        if (type == "previous") {
            if (currentQuater == 4) {
                months.push(10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear() - 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push[07, 08, 09];
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push[01, 02, 03];
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        if (type == "lasttwoquaters") {
            if (currentQuater == 4) {
                months.push(07, 08, 09, 10, 11, 12);
                var d = new Date();
                years.push(d.getFullYear() - 1);
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 3) {
                months.push(04, 05, 06, 07, 08, 09);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 2) {
                months.push(01, 02, 03, 04, 05, 06);
                var d = new Date();
                years.push(d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
            if (currentQuater == 1) {
                months.push(10, 11, 12, 01, 02, 03);
                var d = new Date();
                years.push(d.getFullYear()-1, d.getFullYear());
                monthAndYear.months = months;
                monthAndYear.years = years;
            }
        }

        return monthAndYear;
    }

    var uid = window.localStorage.getItem("uid");

    $scope.backtoPage = function () {
        window.location.href = "DMTilesDisplay.html";
    }
    var listofdms = getUrlParameter("listofdeliverynames", $location.absUrl());

  
    $scope.obj = listofdms;
    
    var monthYear = getCurrentMonthAndYear();
    var type = "revenuechart";

    var currentQuater = getCurrentQuater();
    var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
    var month;

    var url = Serviceurl + "/getrevenue/";
    for (var i = 0; i < dates.months.length; i++) {
        if (dates.months[i] < 10) {
            month = "0" + dates.months[i];
        } else
            month = dates.months[i];

        url += dates.years[0] + "-" + month + "/";
    }
    url += type + "/" + uid + "/" + listofdms;

    $http.get(url)
        .success(function (data) {
            DataBind(data);
        })
    .error();


    $scope.firstQ = function () {
        
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "current");
        var month;

        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        url += type + "/" + uid + "/" + listofdms;
        $http.get(url)
       .success(function (data) {
           DataBind(data);
       })
   .error();
    }

    //next
    $scope.secondQ = function () {
        debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "next");
        var month;
       
        //var requiredDate = dates.years[0] + "-" + month;
        var url=Serviceurl+"/getrevenue/";
        for (var i = 0; i < dates.months.length; i++)
        {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month =  dates.months[i];
            
            url+=dates.years[0] + "-" + month + "/";
        }
        url+=type + "/" + uid + "/" + listofdms;
        $http.get(url)
       .success(function (data) {
          next(data);
      })
  .error();
    }

    //previous
    $scope.thirdQ = function () {
        debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "previous");
        var month;
        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        url += type + "/" + uid + "/" + listofdms;

        $http.get(url)
          .success(function (data) {
              previous(data);
          })
      .error();
    }

    //last2q
    $scope.fourthQ = function () {
        debugger;
        var currentQuater = getCurrentQuater();
        var dates = getMonthAndYearBasedOnQuater(currentQuater, "lasttwoquaters");
        var month;
        var jsonData = [];
        var url = Serviceurl + "/getrevenue/";
        for (var i = 0; i < dates.months.length-3; i++) {
            if (dates.months[i] < 10) {
                month = "0" + dates.months[i];
            } else
                month = dates.months[i];

            url += dates.years[0] + "-" + month + "/";
        }
        url += type + "/" + uid + "/" + listofdms;

        $http.get(url)
       .success(function (data) {
           debugger;
           for (var i = 0; i < data.length; i++) {
               jsonData.push(data[i]);
           }
           url = Serviceurl + "/getrevenue/";
           for (var i = 3; i < dates.months.length; i++) {
               if (dates.months[i] < 10) {
                   month = "0" + dates.months[i];
               } else
                   month = dates.months[i];

               url += dates.years[0] + "-" + month + "/";
           }
           url += type + "/" + uid + "/" + listofdms;
           $http.get(url).success(function (response) {
               debugger;
               var month = getListMonthNames("lasttwoquaters");
               for (var i = 0; i < response.length; i++) {
                   jsonData[i][month[3]] = response[i][month[3]];
                   jsonData[i][month[4]] = response[i][month[4]];
                   jsonData[i][month[5]] = response[i][month[5]];
               }

               lasttwoquaters(jsonData);
           }).error();
       })
   .error();
    }
});

app.controller('listofDMCntrl', ['$scope', '$http', '$rootScope', 'Serviceurl', function ($scope, $http, $rootScope, Serviceurl) {
    //code 
    // $scope.managers = managersData;
    debugger;
    window.localStorage.setItem("reqchmDM", "");

    var uid = window.localStorage.getItem("uid");
    document.getElementById("Loading").style.display = "block";
    $http.get(Serviceurl + "/getdeliverymanagers/" + uid)
    .success(function (response) {
        $scope.managers = response[0].deliverymanagerlist;
        document.getElementById("Loading").style.display = "none";
    })
    .error(function (data, status) {
        document.getElementById("Loading").style.display = "none";
    });

    $scope.selection = [];
    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(dmname);
        }
    }

    $rootScope.dmlistnames = function () {
        if ($scope.selection.length >= 4) {
            $scope.error = "You cannot select more than 4 Delivery Managers";
        } else {
            //  $rootScope.$broadcast("Update", $scope.selection);
            // $rootScope.selectedvalues = $scope.selection;
            window.location.href = "DMTilesDisplay.html?selectedvalues=" + $scope.selection;

            window.localStorage.setItem("reqchmDM", $scope.selection[0]);
        }
    }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }
}]);

//app.directive("dmCheckboxlist", function() {
//    return {
//        restrict: "A",
//        link: function(scope, elem, attrs) {
//            // Determine initial checked boxes
//            if (scope.dmcheckedname.indexOf(scope.dmname.Name) !== -1) {
//                elem[0].checked = true;
//            }

//            // Update array on click
//            elem.bind('click', function() {
//                var index = scope.dmcheckedname.indexOf(scope.dmname.Name);
//                // Add if checked
//                if (elem[0].checked) {
//                    if (index === -1) scope.dmcheckedname.push(scope.dmname.Name);
//                }
//                    // Remove if unchecked
//                else {
//                    if (index !== -1) scope.dmcheckedname.splice(index, 1);
//                }
//                // Sort and update DOM display
//                //scope.$apply(scope.dmcheckedname.sort(function (a, b) {
//                //    return a - b
//                //}));
//            });
//        }
//    }
//});

app.controller('listofaccountsmanagerCntrl', function ($scope, $http, Serviceurl) {
    //code         
    //$scope.managers = managersData;
    //  $scope.managers = ["Ashok", "Atul Agarwal", "Prabhu", "Sandeep S", "Avinash", "Sandy"];
    $scope.accountmanagerlistnames = function () {
        window.location.href = "Accountmanagertiles.html";
    }

    var uid = window.localStorage.getItem("uid");
    $http.get(Serviceurl + "/getaccountmanagers/" + uid)
    .success(function (response) {
        $scope.managers = response[0].accountmanagerlist;
    })
    .error();

    $scope.selection = [];
    $scope.toggleSelection = function (dmname) {
        var idx = $scope.selection.indexOf(dmname);

        // is currently selected
        if (idx > -1) {
            $scope.selection.splice(idx, 1);
        }

            // is newly selected
        else {
            $scope.selection.push(dmname);
        }
    }

    $scope.backtoPage = function () {
        window.location.href = "ManagersTiles.html";
    }
});

function getUrlParameter(param, dummyPath) {
    var sPageURL = dummyPath || window.location.search.substring(1),
        sURLVariables = sPageURL.split(/[&||?]/),
        res;

    for (var i = 0; i < sURLVariables.length; i += 1) {
        var paramName = sURLVariables[i],
            sParameterName = (paramName || '').split('=');

        if (sParameterName[0] === param) {
            res = sParameterName[1];
        }
    }

    return res;
}


app.controller('chmchartcntrl', function ($scope, $http, Serviceurl) {
    var uid = window.localStorage.getItem("uid");

    var chmparameters = window.localStorage.getItem("chmparameter");

    var reqchmDM = window.localStorage.getItem("reqchmDM");

    //var parameters = getUrlParameter("parameter", $location.absUrl());
    //var selectedvalues = $location.search();

    $http.get(Serviceurl + "/getchmparametersfordmdata/chm/" + uid + "/" + reqchmDM)
    .success(function (response) {
        debugger;
        var d = new Date(); // If no date supplied, use today
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];

        var reqResponse = [];

        for (var i = 0; i < response.length; i++) {
            var reqdate = response[i].Date;

            if (cq == 4 && getMonth(reqdate) >= 1 && getMonth(reqdate) <= 3)
                reqResponse.push(response[i]);
            else if (cq == 1 && getMonth(reqdate) >= 4 && getMonth(reqdate) <= 6)
                reqResponse.push(response[i]);
            else if (cq == 2 && getMonth(reqdate) >= 7 && getMonth(reqdate) <= 9)
                reqResponse.push(response[i]);
            else if (cq == 3 && getMonth(reqdate) >= 10 && getMonth(reqdate) <= 12)
                reqResponse.push(response[i]);
        }

        loadchmChartData(reqResponse, chmparameters);//parameters);
    })
    .error();

    $scope.quaterClick = function (x) {

        var d = new Date(); // If no date supplied, use today
        var q = [4, 1, 2, 3];
        var cq = q[Math.floor(d.getMonth() / 3)];
        var months = [];

        if (x == 0) {
            //current quarter
            if (cq == 4)
                months.push[1, 2, 3];
            if (cq == 1)
                months.push[4, 5, 6];
            if (cq == 2)
                months.push[7, 8, 9];
            if (cq == 3)
                months.push[10, 11, 12];
        }
        if (x == 1) {
            //next quarter
            if (cq == 4)
                months.push[4, 5, 6];
            if (cq == 1)
                months.push[7, 8, 9];
            if (cq == 2)
                months.push[10, 11, 12];
            if (cq == 3)
                months.push[1, 2, 3];
        }
        if (x == -1) {
            //prev quarter
            if (cq == 4)
                months.push[10, 11, 12];
            if (cq == 1)
                months.push[1, 2, 3];
            if (cq == 2)
                months.push[4, 5, 6];
            if (cq == 3)
                months.push[7, 8, 9];
        }
        if (x == -1) {
            //Last two quarter
            if (cq == 4)
                months.push[7, 8, 9, 10, 11, 12];
            if (cq == 1)
                months.push[10, 11, 12, 1, 2, 3];
            if (cq == 2)
                months.push[1, 2, 3, 4, 5, 6];
            if (cq == 3)
                months.push[4, 5, 6, 7, 8, 9];
        }

        var uid = window.localStorage.getItem("uid");

        var parameters = null;// getUrlParameter("grossvalue", $location.absUrl())
        //var selectedvalues = $location.search();

        //$scope.message = parameters;

        $http.get(Serviceurl + "/getchmparametersfordmdata/chm/" + uid + "/" + "Pradeep S")
        .success(function (response) {

            var reqResponse = [];

            for (var i = 0; i < response.length; i++) {
                var reqdate = response[i].Date;

                if (getMonth(reqdate) >= 1 && getMonth(reqdate) <= 3)
                    reqResponse.push(response[i]);
                else if (getMonth(reqdate) >= 4 && getMonth(reqdate) <= 6)
                    reqResponse.push(response[i]);
                else if (getMonth(reqdate) >= 7 && getMonth(reqdate) <= 9)
                    reqResponse.push(response[i]);
                else if (getMonth(reqdate) >= 10 && getMonth(reqdate) <= 12)
                    reqResponse.push(response[i]);
            }

            loadchmChartData(reqResponse, null);
        })
        .error();
    }

    $scope.backtoPage = function () {
        backtoPage1();
    }

    function backtoPage1() {
        window.location.href = "CHMParameters.html";
    };
});

function loadchmChartData(responsedata, filterparameter) {
    debugger;
    var ctx = document.getElementById("canvas1").getContext("2d");
    ctx.canvas.width = "300";
    ctx.canvas.height = "280";

    var ctx1 = document.getElementById("canvas2").getContext("2d");
    ctx1.canvas.width = "300";
    ctx1.canvas.height = "280";

    var ctx2 = document.getElementById("canvas3").getContext("2d");
    ctx2.canvas.width = "300";
    ctx2.canvas.height = "280";

    var minictx1 = document.getElementById("minicanvas1").getContext("2d");
    minictx1.canvas.width = "90";
    minictx1.canvas.height = "90";

    var minictx2 = document.getElementById("minicanvas2").getContext("2d");
    minictx2.canvas.width = "90";
    minictx2.canvas.height = "90";

    var minictx3 = document.getElementById("minicanvas3").getContext("2d");
    minictx3.canvas.width = "90";
    minictx3.canvas.height = "90";

    var HeadCountLabel = null, Billable = null, Utilization = null, BillableBulge = null, BillableRookie = null;

    HeadCountLabel = document.getElementById('HeadCount');
    BillableLabel = document.getElementById('Billable');
    UtilizationLabel = document.getElementById('Utilization');
    BillableBulgeLabel = document.getElementById('BillableBulge');
    BillableRookieLabel = document.getElementById('BillableRookie');

    var TTbarchartfillcolor = "rgba(149,26,10,0.75)",
        TTbarchartstrokeColor = "rgba(149,26,10,0.8)",
        TTbarcharthighlightFill = "rgba(149,26,10,5)",
        TTbarcharthighlightStroke = "rgba(149,26,10,1)";
    var ATbarchartfillcolor = "rgba(89,171,86,0.75)",
        ATbarchartstrokeColor = "rgba(89,171,86,0.8)",
        ATbarcharthighlightFill = "rgba(89,171,86,5)",
        ATbarcharthighlightStroke = "rgba(89,171,86,1)";
    var PTbarchartfillcolor = "rgba(40, 149, 205,0.5)",
        PTbarchartstrokeColor = "rgba(40, 149, 205,0.8)",
        PTbarcharthighlightFill = "rgba(40, 149, 205,5)",
        PTbarcharthighlightStroke = "rgba(40, 149, 205,1)";

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

    var datadates = [];
    var labels = [];
    var billabledataonly = [0, 0, 0];
    var billablebulgedataonly = [0, 0, 0];
    var billablerookiedataonly = [0, 0, 0];

    HeadCountLabelsum = 0;
    BillableLabelsum = 0;
    UtilizationLabelsum = 0;
    BillableBulgeLabelsum = 0;
    BillableRookieLabelsum = 0;
    //var reqFilteredByParameterData = [];
    //var reqFilteredByParameterData = [];
    //var reqFilteredByParameterData = [];

    for (var i = 0; i < responsedata.length; i++) {

        //var reqFilteredByParameterData = JsonSplitData(responsedata[i], filterparameter);        
        //var reqFilteredByParameterData = JsonSplitData(responsedata[i], filterparameter);
        //var reqFilteredByParameterData = JsonSplitData(responsedata[i], filterparameter);

        var reqFilteredByParameterData = JsonSplitData(responsedata[i], filterparameter);

        //datadates.push(responsedata[i].Date);
        var reqdate = responsedata[i].Date;
        var m = getMonth(reqdate);

        if (m >= 1 && m <= 3) {
            if (filterparameter == "Gross") {
                if (labels.length == 0)
                    labels.push("January", "February", "March");

                if (m == 1) {
                    if (reqFilteredByParameterData["Gross Billable #"] != null)
                        billabledataonly[0] = reqFilteredByParameterData["Gross Billable #"];

                    if (reqFilteredByParameterData["Gross Billable Bulge"] != null)
                        billablebulgedataonly[0] = reqFilteredByParameterData["Gross Billable Bulge"].replace('%', '');

                    if (reqFilteredByParameterData["Gross Billable Rookie"] != null)
                        billablerookiedataonly[0] = reqFilteredByParameterData["Gross Billable Rookie"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Gross #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Gross Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Gross Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Bulge"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Rookie"].replace('%', ''));
                }
                else if (m == 2) {
                    if (reqFilteredByParameterData["Gross Billable #"] != null)
                        billabledataonly[1] = reqFilteredByParameterData["Gross Billable #"];

                    if (reqFilteredByParameterData["Gross Billable Bulge"] != null)
                        billablebulgedataonly[1] = reqFilteredByParameterData["Gross Billable Bulge"].replace('%', '');

                    if (reqFilteredByParameterData["Gross Billable Rookie"] != null)
                        billablerookiedataonly[1] = reqFilteredByParameterData["Gross Billable Rookie"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Gross #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Gross Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Gross Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Bulge"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Rookie"].replace('%', ''));
                }
                else if (m == 3) {
                    if (reqFilteredByParameterData["Gross Billable #"] != null)
                        billabledataonly[2] = reqFilteredByParameterData["Gross Billable #"];

                    if (reqFilteredByParameterData["Gross Billable Bulge"] != null)
                        billablebulgedataonly[2] = reqFilteredByParameterData["Gross Billable Bulge"].replace('%', '');

                    if (reqFilteredByParameterData["Gross Billable Rookie"] != null)
                        billablerookiedataonly[2] = reqFilteredByParameterData["Gross Billable Rookie"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Gross #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Gross Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Gross Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Bulge"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Gross Billable Rookie"].replace('%', ''));
                }
            }
            else if (filterparameter == "Onsite") {
                if (labels.length == 0)
                    labels.push("January", "February", "March");
                //billabledataonly = [0, reqFilteredByParameterData["Onsite Billable #"], 0];
                //billablebulgedataonly = [0, reqFilteredByParameterData["Onsite NB #"].replace('%', ''), 0];
                //billablerookiedataonly = [0, reqFilteredByParameterData["Onsite Contractors"].replace('%', ''), 0];

                if (m == 1) {
                    if (reqFilteredByParameterData["Onsite Billable #"] != null)
                        billabledataonly[0] = reqFilteredByParameterData["Onsite Billable #"];

                    if (reqFilteredByParameterData["Onsite NB #"] != null)
                        billablebulgedataonly[0] = reqFilteredByParameterData["Onsite NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Onsite Contractors"] != null)
                        billablerookiedataonly[0] = reqFilteredByParameterData["Onsite Contractors"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Onsite #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Onsite Billable #"]);
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Onsite Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Onsite NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Onsite Contractors"].replace('%', ''));
                }
                else if (m == 2) {
                    if (reqFilteredByParameterData["Onsite Billable #"] != null)
                        billabledataonly[1] = reqFilteredByParameterData["Onsite Billable #"];

                    if (reqFilteredByParameterData["Onsite NB #"] != null)
                        billablebulgedataonly[1] = reqFilteredByParameterData["Onsite NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Onsite Contractors"] != null)
                        billablerookiedataonly[1] = reqFilteredByParameterData["Onsite Contractors"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Onsite #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Onsite Billable #"]);
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Onsite Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Onsite NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Onsite Contractors"].replace('%', ''));
                }
                else if (m == 3) {
                    if (reqFilteredByParameterData["Onsite Billable #"] != null)
                        billabledataonly[2] = reqFilteredByParameterData["Onsite Billable #"];

                    if (reqFilteredByParameterData["Onsite NB #"] != null)
                        billablebulgedataonly[2] = reqFilteredByParameterData["Onsite NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Onsite Contractors"] != null)
                        billablerookiedataonly[2] = reqFilteredByParameterData["Onsite Contractors"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Onsite #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Onsite Billable #"]);
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Onsite Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Onsite NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Onsite Contractors"].replace('%', ''));
                }
            }
            else if (filterparameter == "Offshore") {
                if (labels.length == 0)
                    labels.push("January", "February", "March");
                //billabledataonly = [0, reqFilteredByParameterData["Offshore Billable #"], 0];
                //billablebulgedataonly = [0, reqFilteredByParameterData["Offshore NB #"].replace('%', ''), 0];
                //billablerookiedataonly = [0, reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', ''), 0];

                if (m == 1) {
                    if (reqFilteredByParameterData["Offshore Billable #"] != null)
                        billabledataonly[0] = reqFilteredByParameterData["Offshore Billable #"];

                    if (reqFilteredByParameterData["Offshore NB #"] != null)
                        billablebulgedataonly[0] = reqFilteredByParameterData["Offshore NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Offshore Non-Rookie NB #"] != null)
                        billablerookiedataonly[0] = reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Offshore #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Offshore Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Offshore Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Offshore NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', ''));
                }
                else if (m == 2) {
                    if (reqFilteredByParameterData["Offshore Billable #"] != null)
                        billabledataonly[1] = reqFilteredByParameterData["Offshore Billable #"];

                    if (reqFilteredByParameterData["Offshore NB #"] != null)
                        billablebulgedataonly[1] = reqFilteredByParameterData["Offshore NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Offshore Non-Rookie NB #"] != null)
                        billablerookiedataonly[1] = reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Offshore #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Offshore Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Offshore Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Offshore NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', ''));
                }
                else if (m == 3) {
                    if (reqFilteredByParameterData["Offshore Billable #"] != null)
                        billabledataonly[2] = reqFilteredByParameterData["Offshore Billable #"];

                    if (reqFilteredByParameterData["Offshore NB #"] != null)
                        billablebulgedataonly[2] = reqFilteredByParameterData["Offshore NB #"].replace('%', '');

                    if (reqFilteredByParameterData["Offshore Non-Rookie NB #"] != null)
                        billablerookiedataonly[2] = reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', '');

                    HeadCountLabelsum = HeadCountLabelsum + parseInt(reqFilteredByParameterData["Offshore #"].replace('%', ''));
                    BillableLabelsum = BillableLabelsum + parseInt(reqFilteredByParameterData["Offshore Billable #"].replace('%', ''));
                    UtilizationLabelsum = UtilizationLabelsum + parseInt(reqFilteredByParameterData["Offshore Utilization"].replace('%', ''));
                    BillableBulgeLabelsum = BillableBulgeLabelsum + parseInt(reqFilteredByParameterData["Offshore NB #"].replace('%', ''));
                    BillableRookieLabelsum = BillableRookieLabelsum + parseInt(reqFilteredByParameterData["Offshore Non-Rookie NB #"].replace('%', ''));
                }
            }
        }
        //reqFilteredByParameterData = [];
        //reqFilteredByParameterData = [];
        //reqFilteredByParameterData = [];
    }
    HeadCountLabel.innerHTML = HeadCountLabelsum;
    BillableLabel.innerHTML = BillableLabelsum;
    UtilizationLabel.innerHTML = UtilizationLabelsum + " %";
    BillableBulgeLabel.innerHTML = BillableBulgeLabelsum +" %";
    BillableRookieLabel.innerHTML = BillableRookieLabelsum + " %";

    var barChartDataQ1 = {
        labels: labels,
        datasets: [
            {
                fillColor: TTbarchartfillcolor,
                strokeColor: TTbarchartstrokeColor,
                highlightFill: TTbarcharthighlightFill,
                highlightStroke: TTbarcharthighlightStroke,
                data: billabledataonly
            }
        ]
    }

    var minibarChartDataQ1 = {
        labels: ["", "", ""],
        datasets: [
            {
                fillColor: TTbarchartfillcolor,
                strokeColor: TTbarchartstrokeColor,
                highlightFill: TTbarcharthighlightFill,
                highlightStroke: TTbarcharthighlightStroke,
                data: billabledataonly
            }
        ]
    }

    var barChartDataQ2 = {
        labels: labels,
        datasets: [
            {
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: billablebulgedataonly
            }
        ]

    }

    var minibarChartDataQ2 = {
        labels: ["", "", ""],
        datasets: [
            {
                fillColor: ATbarchartfillcolor,
                strokeColor: ATbarchartstrokeColor,
                highlightFill: ATbarcharthighlightFill,
                highlightStroke: ATbarcharthighlightStroke,
                data: billablebulgedataonly
            }
        ]

    }

    var barChartDataQ3 = {
        labels: labels,
        datasets: [
             {
                 fillColor: PTbarchartfillcolor,
                 strokeColor: PTbarchartstrokeColor,
                 highlightFill: PTbarcharthighlightFill,
                 highlightStroke: PTbarcharthighlightStroke,
                 data: billablerookiedataonly
             }
        ]

    }

    var minibarChartDataQ3 = {
        labels: ["", "", ""],
        datasets: [
             {
                 fillColor: PTbarchartfillcolor,
                 strokeColor: PTbarchartstrokeColor,
                 highlightFill: PTbarcharthighlightFill,
                 highlightStroke: PTbarcharthighlightStroke,
                 data: billablerookiedataonly
             }
        ]

    }

    window.myBar = new Chart(ctx).Bar(barChartDataQ1, {
        responsive: false
    });
    window.myBar = new Chart(ctx1).Bar(barChartDataQ2, {
        responsive: false
    });
    window.myBar = new Chart(ctx2).Bar(barChartDataQ3, {
        responsive: false
    });

    window.myBar = new Chart(minictx1).Bar(minibarChartDataQ1, {
        responsive: false,
        scaleShowLabels: false,
        pointLabelFontSize: 0,
        scaleFontSize: 15,
        barValueSpacing: 1,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });
    window.myBar = new Chart(minictx2).Bar(minibarChartDataQ2, {
        responsive: false,
        scaleBackdropPaddingX: 1,
        scaleShowLabels: false,
        barValueSpacing: 1,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });
    window.myBar = new Chart(minictx3).Bar(minibarChartDataQ3, {
        responsive: false,
        legendTemplate: '',
        scaleShowLabels: false,
        barValueSpacing: 2,
        barDatasetSpacing: 1,
        showTooltips: false,
        tooltipYPadding: 0
    });
};

function getMonth(graphdate) {
    var months = {
        en: {
            "jan": 0,
            "feb": 1,
            "mar": 2,
            "apr": 3,
            "may": 4,
            "jun": 5,
            "jul": 6,
            "aug": 7,
            "sep": 8,
            "oct": 9,
            "nov": 10,
            "dec": 11
        }
    };

    var dt = new Date(
        parseInt(graphdate.substring(7), 12),               // year
        months.en[graphdate.substring(3, 6).toLowerCase()], // month
        parseInt(graphdate.substring(0, 2), 12)             // day
    );
    return dt.getMonth() + 1;
}

function JsonSplitData(responsedata, filterparameter) {
    var arr = Object.keys(responsedata);

    var fields = arr;
    var res = {};
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].indexOf(filterparameter) > -1) {
            res[fields[i]] = responsedata[fields[i]];
        }
    }
    return res;
}
