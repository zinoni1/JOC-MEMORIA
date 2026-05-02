var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 0, nColumnes = 0;
var constant = 132;
var numCartes = 0;
var clicks = 0;
var animacioEnCurs = false;
var intervalTemps = null;
var musicaFons = new Audio('so/musicaFons.mp3');
var soCorrecte = new Audio('so/correct.mp3');
var soIncorrecte = new Audio('so/incorrect.mp3');
var soVictoria = new Audio('so/victoria.mp3');

//array buit per posar les cartes girades (max 2)
var cartesGirades = [];
var jocCartes = [

    'carta1', 'carta2', 'carta3', 'carta4', 'carta5', 'carta6', 'carta7', 'carta8',
    'carta9', 'carta10', 'carta11', 'carta12', 'carta13', 'carta14', 'carta15',
    'carta16', 'carta17', 'carta18', 'carta19', 'carta20', 'carta21', 'carta22',
    'carta23',

]
//copia per poder barrejar sense tocar la original
var jocCartesCopia = [];
;

function valorTauler() {
    pararMusicaFons();
    const valorFila = document.getElementById("fila").value;

    if (valorFila <= 0) {
        alert("Els valors no poden ser negatius")
        return;
    }
    const valorColumna = document.getElementById("columna").value;


    if (valorColumna <= 0) {
        alert("Els valors no poden ser negatius")
        return;
    }

    var valorTotal = valorColumna * valorFila;

    if (valorTotal % 2 !== 0) {
        if (valorTotal == 2) {
            alert("Valors massa petits");
            return;
        }
        else {
            alert("La multiplicació dels 2 valors ha de donar parell!");
            return;
        }

    }

    else if (valorTotal > 46) {
        alert("Els valors han de ser menors")
        return;
    }

    else {
        nFiles = valorFila;
        nColumnes = valorColumna;

        Reproduir()
        crearTauler();
    }
}


function crearTauler() {

    var tauler = $("#tauler");
    tauler.empty();

    var f, c, carta;
    f = 1;
    c = 1;



    jocCartesCopia = barrejar(jocCartes);

    var width = constant * nColumnes + separacioH;
    var height = constant * nFiles + separacioV;
    for (let f = 1; f <= nFiles; f++) {
        for (let c = 1; c <= nColumnes; c++) {
            var id = "f" + f + "c" + c;
            tauler.append('<div class="carta" id="' + id + '"><div class="cara darrera"></div><div class="cara davant"></div></div>');
        }
    }

    var index = 0;

    ampladaCarta = $(".carta").width();
    alcadaCarta = $(".carta").height();
    // mida del tauler
    $("#tauler").css({
        "width": width,
        "height": height
    });


    for (let f = 1; f <= nFiles; f++) {
        for (let c = 1; c <= nColumnes; c++) {
            carta = $("#f" + f + "c" + c);
            carta.find(".davant").addClass(jocCartesCopia[index]);
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top": ((f - 1) * (alcadaCarta + separacioV) + separacioV) + "px"
            });
            index++;

        }
    }

    $(".carta").on("click", function () {
        if (animacioEnCurs) return;
        clicks++;
        if ($(this).hasClass("carta-girada")) {
            return;
        };

        var clicsTotals = numCartes * 3;
        $("#clicsRestants").text(Math.max(0, clicsTotals - clicks));


        $(this).toggleClass("carta-girada");
        cartesGirades.push($(this));

        if (cartesGirades.length == 2) {
            comprobarCartes();
            return;
        }

    });

    // Inicialitza i mostra el comptador de clics
    var clicsTotals = numCartes * 3;
    $("#clicsRestants").text(clicsTotals);
    $("#infoClics").show();

    // Inicia el comptador de temps
    iniciarComptador();

};

function comprobarCartes() {
    animacioEnCurs = true;
    var carta1 = cartesGirades[0];
    var carta2 = cartesGirades[1];
    var clases1 = carta1.find(".davant").attr("class");
    var clases2 = carta2.find(".davant").attr("class");
    var carta1num = clases1.match(/carta\d+/)[0];
    var carta2num = clases2.match(/carta\d+/)[0];

    console.log(clases1);
    console.log(clases2);

    clicsTotals = numCartes * 3;
    console.log(clicks, clicsTotals, numCartes);
    if (carta1num == carta2num && carta1.attr("id") != carta2.attr("id")) {
        carta1.fadeOut(500, function () { $(this).remove(); });
        carta2.fadeOut(500, function () {
            Correcte();
            $(this).remove();
            animacioEnCurs = false;
            if ($(".carta").length == 0) {
                guanyar();
            }
        });
    } else if (clicks > clicsTotals) {
        perdre();
    } else {
        setTimeout(function () {
            console.log("Malament");
            Incorrecte();
            carta1.removeClass("carta-girada");
            carta2.removeClass("carta-girada");
            animacioEnCurs = false;
        }, 1000);
    }
    cartesGirades = [];
}
function guanyar() {
    clearInterval(intervalTemps);
    $("#tauler").remove();

    Victoria();
    pararMusicaFons();

    $("body").append('<div><h1>Has guanyat!</h1><button class="btn btn-primary" id="reiniciar">Reiniciar</button></div>');
    $("#reiniciar").on("click", function () {
        location.reload();
    });


};
function perdre() {
    clearInterval(intervalTemps);
    $("#tauler").remove();

    pararMusicaFons();

    $("body").append('<div><h1>Has perdut!</h1><br><h4>Has superat el nombre màxim de clics</h4><button class="btn btn-primary" id="reiniciar">Reiniciar</button></div>');

    $("#reiniciar").on("click", function () {
        location.reload();
    });
};


function iniciarComptador() {
    if (intervalTemps) clearInterval(intervalTemps);
    // El temps és 8 segons per cada carta
    var temps = numCartes * 8;
    $("#tempsRestants").text(temps);
    $("#infoTemps").show();

    intervalTemps = setInterval(function () {
        temps--;
        $("#tempsRestants").text(temps);
        if (temps <= 0) {
            clearInterval(intervalTemps);
            perdre();
        }
    }, 1000);
}

function barrejar(cartes) {
    numCartes = nColumnes * nFiles; //numero total de cartes

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


function Reproduir() {
    musicaFons.loop = true;
    musicaFons.volume = $("#sliderVolum").val() / 100;
    musicaFons.play();
}

function canviarVolum(valor) {
    musicaFons.volume = valor / 100;
    if (valor == 0) {
        $("#iconVolum").text("🔇");
    } else if (valor < 50) {
        $("#iconVolum").text("🔉");
    } else {
        $("#iconVolum").text("🔊");
    }
}

function Correcte() {
    soCorrecte.play();
}

function Incorrecte() {
    soIncorrecte.play();
}

function Victoria() {
    soVictoria.play();
}


function pararMusicaFons() {
    musicaFons.pause();
    musicaFons.currentTime = 0;
}


