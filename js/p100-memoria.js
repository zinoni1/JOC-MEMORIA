var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=0, nColumnes=0;


var jocCartes = [

  'carta1','carta2','carta3','carta4','carta5','carta6','carta7','carta8',
  'carta9','carta10','carta11','carta12','carta13','carta14','carta15',
  'carta16','carta17','carta18','carta19','carta20','carta21','carta22',
  'carta23',

  'carta1','carta2','carta3','carta4','carta5','carta6','carta7','carta8',
  'carta9','carta10','carta11','carta12','carta13','carta14','carta15',
  'carta16','carta17','carta18','carta19','carta20','carta21','carta22',
  'carta23'
]
;

function valorTauler(){
    const valorFila = document.getElementById("fila").value;
    const valorColumna = document.getElementById("columna").value;
    var valorTotal = valorColumna * valorFila;
    if(valorTotal % 2 !== 0){
    alert("La multiplicació dels 2 valors ha de donar parell!");}
    else{
        nFiles = valorFila;
        nColumnes = valorColumna;
        
        crearTauler();
}
}


function crearTauler(){

    var tauler = $("#tauler");
    tauler.empty();
    
    var f, c, carta;
    f=1;
    c=1;

    

    jocCartes = barrejar(jocCartes);
 
    var width = 132*nColumnes + separacioH;
    var height = 132*nFiles + separacioV;
    for (let f = 1; f <= nFiles; f++) {
    for (let c = 1; c <= nColumnes; c++) {
        var id = "f"+f+"c"+c;
        tauler.append('<div class="carta" id="'+id+'"><div class="cara darrera"></div><div class="cara davant"></div></div>');
      }
    }

    var index = 0;

    ampladaCarta=$(".carta").width(); 
    alcadaCarta=$(".carta").height();
    // mida del tauler
    $("#tauler").css({
        "width" : width,
        "height": height
    });

    
   for (let f = 1; f <= nFiles; f++) {
    for (let c = 1; c <= nColumnes; c++) {
        carta = $("#f" + f + "c" + c);
        carta.find(".davant").addClass(jocCartes[index]);
            carta.css({
                "left": ((c-1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top":  ((f-1) * (alcadaCarta  + separacioV) + separacioV) + "px"
            });
        index++;

      }
    }
   
    $(".carta").on("click",function(){
        $(this).toggleClass("carta-girada");
    });

};


function barrejar(cartes) {
    for (var i = cartes.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cartes[i];
        cartes[i] = cartes[j];
        cartes[j] = temp;
    }
    return cartes;
}