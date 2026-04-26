var ampladaCarta, alcadaCarta;
var separacioH=20, separacioV=20;
var nFiles=0, nColumnes=0;
var constant = 132;

var musicaFons = new Audio('so/musicaFons.mp3');

    //array buit per posar les cartes girades (max 2)
    var cartesGirades = [];
var jocCartes = [

  'carta1','carta2','carta3','carta4','carta5','carta6','carta7','carta8',
  'carta9','carta10','carta11','carta12','carta13','carta14','carta15',
  'carta16','carta17','carta18','carta19','carta20','carta21','carta22',
  'carta23',

]
//copia per poder barrejar sense tocar la original
var jocCartesCopia = [];
;

function valorTauler(){
    const valorFila = document.getElementById("fila").value;

    if(valorFila < 0){
        alert("Els valors no poden ser negatius")
    }
    const valorColumna = document.getElementById("columna").value;


    if(valorColumna <0){
        alert("Els valors no poden ser negatius")
    }

    var valorTotal = valorColumna * valorFila;

    if(valorTotal % 2 !== 0){
    alert("La multiplicació dels 2 valors ha de donar parell!");
    }
    
    else if(valorTotal > 46){
        alert("Els valors han de ser menors")
    }

    else{
        nFiles = valorFila;
        nColumnes = valorColumna;
        
        Reproduir()
        crearTauler();
    }
}


function crearTauler(){

    var tauler = $("#tauler");
    tauler.empty();
    
    var f, c, carta;
    f=1;
    c=1;

    

    jocCartesCopia = barrejar(jocCartes);
 
    var width = constant*nColumnes + separacioH;
    var height = constant*nFiles + separacioV;
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
        carta.find(".davant").addClass(jocCartesCopia[index]);
            carta.css({
                "left": ((c-1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top":  ((f-1) * (alcadaCarta  + separacioV) + separacioV) + "px"
            });
        index++;

      }
    }

    $(".carta").on("click",function(){
        //girar maxim 2 cartes al mateix temps
        if (cartesGirades.length == 2){
            return;
        };
        //no girar la mateixa carta
        if ($(this).hasClass("carta-girada")){
        return;
        };
        $(this).toggleClass("carta-girada");
        cartesGirades.push($(this));

        if (cartesGirades.length == 2){
             comprobarCartes();
        }
        
    });

};

function comprobarCartes(){
    var carta1 = cartesGirades[0];
    var carta2 = cartesGirades[1];
     carta1.fadeOut(500, function(){ $(this).remove(); });
        carta2.fadeOut(500, function(){ $(this).remove(); });
        cartesGirades = [];
}


function barrejar(cartes) {
    let numCartes = nColumnes * nFiles; //numero total de cartes

    //barrejar
    for (var i = cartes.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cartes[i];
        cartes[i] = cartes[j];
        cartes[j] = temp;
    }

    //dividir perque tinguin una parella
    let cartesUniques = cartes.slice(0, numCartes / 2);

    //tornar a barrejar
    let cartesDobles = cartesUniques.concat(cartesUniques);
    for (var i = cartesDobles.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cartesDobles[i];
        cartesDobles[i] = cartesDobles[j];
        cartesDobles[j] = temp;
    }

    return cartesDobles;
}


function Reproduir(){
    musicaFons.loop = true; // Que la música es repeteixi
    musicaFons.play();
    var musicaIniciada = true;
}


function pararMusicaFons() {
    musicaFons.pause();
    musicaFons.currentTime = 0;
}


