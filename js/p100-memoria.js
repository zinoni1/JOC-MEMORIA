var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=1, nColumnes=1;

var jocCartes = [
    'carta2'
];


$(function(){
    var f, c, carta;
    f=1;
    c=1;

 

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
    // mida del tauler
    $("#tauler").css({
        "width" : "150px",
        "height": "150px"
    });

    carta=$("#f"+f+"c"+c);
    carta.css({
        "left" :  ((c-1)*(ampladaCarta+separacioH)+separacioH)+"px",
        "top"  :  ((f-1)*(alcadaCarta+separacioV) +separacioV)+"px"
    });
    carta.find(".davant").addClass(jocCartes.pop());
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

});