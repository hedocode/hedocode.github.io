console.log('hscript.js Loaded');

var width = 2;
var orientation = "bottom";

document.title = "Title 2";

$(document).ready(
    function(){
        $(".bbr").hover(function(){
            $(this).css("padding-"+ orientation, "0px");
            $(this).css("border-" + orientation, width + "px solid red")
        }, function(){
            $(this).css("padding-" + orientation, width + "px");
            $(this).css("border-" + orientation, "0px solid red")
        });
        $(".bbb").hover(function(){
            $(this).css("padding-"+ orientation, "0px");
            $(this).css("border-" + orientation, width + "px solid blue")
        }, function(){
            $(this).css("padding-" + orientation, width + "px");
            $(this).css("border-" + orientation, "0px solid blue")
        });
    }
);