$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
    //alert(1);
});

function redirectmaps() {
    //debugger;
    //alert("");
    //window.location.href = "map_master.html";
    window.location.href = "mapFrame.html";
 //   $("#backpagediv").hide();
}

function redirectToHome() {
    window.location.href = "mapFrame.html";

}

$(document).ready(function () { 
    //$("#backpagediv").hide();

    //if (window.location.href = "../Views/ManagersTiles.html") {
    //    $("#backpagediv").show();
    //}

});

function backtoPage() {
    debugger;
    //if (window.location.href == "mapFrame.html") {
    //    $("#backpagediv").hide();
    //}
}