/// <reference path="jquery-1.11.1.min.js" />
function customCheckbox(checkboxName) {
    var checkBox = $('input[name="' + checkboxName + '"]');
    $(checkBox).each(function () {
        $(this).wrap("<span class='custom-checkbox'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });

    $(checkBox).click(function () {
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });
    $("#checkAll").change(function () {
        var checkBox = $('input[name="Accountname"]');
        $(checkBox).each(function () {
            if ($("#checkAll").is(':checked')) {
                $(this).parent().removeClass("selected");
                $(this).parent().addClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
                $(this).parent().parent().addClass("labelselectedcheckbox");              
            }
            else {
                $(this).parent().removeClass("selected");
                $(this).parent().parent().removeClass("labelselectedcheckbox");
            }
        });
    });
    $("#checkAll").click(function () {
        $(this).parent().toggleClass("selected");
        $(this).parent().parent().toggleClass("labelselectedcheckbox");
    });
}
$(document).ready(function () {
    customCheckbox("Accountname");
});

function clearcheckboxes() {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        $(this).parent().removeClass("selected");
        $(this).parent().parent().removeClass("labelselectedcheckbox");
    });
}

function Checkboxstatechange(checkbox) {
    $(checkbox).parent().toggleClass("selected");
    if ($(checkbox).is(':checked')) {
        if ($("#checkAll") != checkbox) {
            $("#checkAll").parent().removeClass("selected");
            $("#checkAll").parent().parent().removeClass("labelselectedcheckbox");
        }
        //$(checkbox).parent().removeClass("selected");
        //$(checkbox).parent().parent().removeClass("labelselectedcheckbox");
        $(checkbox).parent().addClass("selected");
        $(checkbox).parent().parent().addClass("labelselectedcheckbox");
    }
    else {
        //$(checkbox).parent().addClass("selected");
        //$(checkbox).parent().parent().addClass("labelselectedcheckbox");
        $(checkbox).parent().removeClass("selected");
        $(checkbox).parent().parent().removeClass("labelselectedcheckbox");
    }
}

function singleselectionchange(checkbox1) {
    var checkBox = $('input[name="Accountname"]');
    $(checkBox).each(function () {
        if (!$(this).is(checkbox1)) {
            $(this).parent().removeClass("selected");
            $(this).parent().parent().removeClass("labelselectedcheckbox");
        }
        else {
            $(checkbox1).addClass("selected");
            $(checkbox1).parent().addClass("labelselectedcheckbox");
        }
    });
}

