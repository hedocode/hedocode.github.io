var width = 2;
var orientation = "bottom";

var fr = new FileReader("style.css");
file.open("w");
file.writeln("azkda");
file.close();

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

var classes = [];
