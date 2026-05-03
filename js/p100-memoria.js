// ── Variables tipus ──────────────────────────────────────────────────
var tipusCarta = null;

var jocCartesPokemon = [
    'carta1','carta2','carta3','carta4','carta5','carta6','carta7',
    'carta8','carta9','carta10','carta11','carta12','carta13','carta14',
    'carta15','carta16','carta17','carta18','carta19','carta20','carta21'
];

// 52 cartes de poker (13 per pal × 4 pals)
var jocCartesPoker = [
    'carta1','carta2','carta3','carta4','carta5','carta6','carta7',
    'carta8','carta9','carta10','carta11','carta12','carta13',
    'carta14','carta15','carta16','carta17','carta18','carta19','carta20',
    'carta21','carta22','carta23','carta24','carta25','carta26',
    'carta27','carta28','carta29','carta30','carta31','carta32','carta33',
    'carta34','carta35','carta36','carta37','carta38','carta39',
    'carta40','carta41','carta42','carta43','carta44','carta45','carta46',
    'carta47','carta48','carta49','carta50','carta51','carta52'
];

// ── Variables generals ───────────────────────────────────────────────
var ampladaCarta, alcadaCarta;
var separacioH = 20, separacioV = 20;
var nFiles = 0, nColumnes = 0;
var numCartes = 0;
var clicks = 0;
var animacioEnCurs = false;
var intervalTemps = null;
var temps = 0;

var musicaFons;
var soCorrecte   = new Audio('so/correct.mp3');
var soIncorrecte = new Audio('so/incorrect.mp3');
var soVictoria   = new Audio('so/victoria.mp3');

var cartesGirades  = [];
var jocCartesCopia = [];

// ── Selecció de tipus ────────────────────────────────────────────────
function seleccionarTipus(tipus) {
    tipusCarta = tipus;
    $('#seleccio').hide();
    $('#configuracio').show();

    if(tipus == 'poker'){
        musicaFons = new Audio('so/pokerMusica.mp3');
    }
    else{
        musicaFons   = new Audio('so/musicaFons.mp3');
    }
}

// ── valorTauler ──────────────────────────────────────────────────────
function valorTauler() {
    pararMusicaFons();
    const valorFila    = parseInt(document.getElementById("fila").value);
    const valorColumna = parseInt(document.getElementById("columna").value);

    if (isNaN(valorFila) || isNaN(valorColumna) || valorFila <= 0 || valorColumna <= 0) {
        alert("Els valors no poden ser negatius"); return;
    }

    var valorTotal = valorFila * valorColumna;
    var maxCartes  = tipusCarta === 'poker' ? 104 : 42;

    if (valorTotal === 2) {
        alert("Valors massa petits"); return;
    }
    if (valorTotal % 2 !== 0) {
        alert("La multiplicació dels 2 valors ha de donar parell!"); return;
    }
    if (valorTotal > maxCartes) {
        alert("Els valors han de ser menors"); return;
    }

    nFiles    = valorFila;
    nColumnes = valorColumna;
    Reproduir();
    crearTauler();
}

// ── crearTauler ──────────────────────────────────────────────────────
function crearTauler() {
    clicks         = 0;
    cartesGirades  = [];
    animacioEnCurs = false;
    if (intervalTemps) clearInterval(intervalTemps);
    $("#controls-joc").hide();   // ← afegeix aquesta línia


    if (tipusCarta === 'poker') {
        $('body').addClass('poker');
    } else {
        $('body').removeClass('poker');
    }

    var jocCartes = tipusCarta === 'poker' ? jocCartesPoker : jocCartesPokemon;

    var tauler = $("#tauler");
    tauler.empty();

    for (let f = 1; f <= nFiles; f++) {
        for (let c = 1; c <= nColumnes; c++) {
            var id = "f" + f + "c" + c;
            tauler.append(
                '<div class="carta" id="' + id + '">' +
                    '<div class="cara darrera"></div>' +
                    '<div class="cara davant"></div>' +
                '</div>'
            );
        }
    }

    jocCartesCopia = barrejar(jocCartes);

    ampladaCarta = $(".carta").width();
    alcadaCarta  = $(".carta").height();

    var width  = (ampladaCarta + separacioH) * nColumnes + separacioH;
    var height = (alcadaCarta  + separacioV) * nFiles    + separacioV;
    $("#tauler").css({ "width": width, "height": height });

    var index = 0;
    for (let f = 1; f <= nFiles; f++) {
        for (let c = 1; c <= nColumnes; c++) {
            var carta = $("#f" + f + "c" + c);
            carta.find(".davant").addClass(jocCartesCopia[index]);
            carta.css({
                "left": ((c - 1) * (ampladaCarta + separacioH) + separacioH) + "px",
                "top":  ((f - 1) * (alcadaCarta  + separacioV) + separacioV) + "px"
            });
            index++;
        }
    }

    $(".carta").on("click", function () {
        if (animacioEnCurs) return;
        if ($(this).hasClass("carta-girada")) return;

        clicks++;
        var clicsTotals = numCartes * 3;
        $("#clicsRestants").text(Math.max(0, clicsTotals - clicks));

        $(this).toggleClass("carta-girada");
        cartesGirades.push($(this));
        if (cartesGirades.length === 2) comprobarCartes();
    });

    var clicsTotals = numCartes * 3;
    $("#clicsRestants").text(clicsTotals);
    $("#infoClics").show();
    $("#footer-joc").show();
    iniciarComptador();
}

// ── comprobarCartes ──────────────────────────────────────────────────
function comprobarCartes() {
    animacioEnCurs = true;
    var carta1 = cartesGirades[0];
    var carta2 = cartesGirades[1];
    var clases1   = carta1.find(".davant").attr("class");
    var clases2   = carta2.find(".davant").attr("class");
    var carta1num = clases1.match(/carta\d+/)[0];
    var carta2num = clases2.match(/carta\d+/)[0];

    var clicsTotals = numCartes * 3;

    if (carta1num === carta2num && carta1.attr("id") !== carta2.attr("id")) {
        carta1.fadeOut(500, function () { $(this).remove(); });
        carta2.fadeOut(500, function () {
            Correcte();
            $(this).remove();
            animacioEnCurs = false;
            if ($(".carta").length === 0) guanyar();
        });
    } else if (clicks > clicsTotals) {
        perdre();
    } else {
        setTimeout(function () {
            Incorrecte();
            carta1.removeClass("carta-girada");
            carta2.removeClass("carta-girada");
            animacioEnCurs = false;
        }, 1000);
    }
    cartesGirades = [];
}

// ── guanyar / perdre ─────────────────────────────────────────────────
function guanyar() {
    clearInterval(intervalTemps);
    $("#tauler").remove();
    $("#footer-joc").hide();
    Victoria();
    pararMusicaFons();
    $("body").append('<div class="missatge-final"><h1>Has guanyat! 🎉</h1><button class="btn btn-primary mt-3" id="reiniciar">Reiniciar</button></div>');
    $("#reiniciar").on("click", function () { location.reload(); });
}

function perdre() {
    $("#tauler").remove();
    $("#footer-joc").hide();
    pararMusicaFons();

    if (temps <= 0){
        $("body").append('<div class="missatge-final"><h1>Has perdut! 😞</h1><h4>El temps ha acabat</h4><button class="btn btn-primary mt-3" id="reiniciar">Reiniciar</button></div>');
    }else{
        $("body").append('<div class="missatge-final"><h1>Has perdut! 😞</h1><h4>Has superat el nombre màxim de clics</h4><button class="btn btn-primary mt-3" id="reiniciar">Reiniciar</button></div>');

    }
    clearInterval(intervalTemps);

    $("#reiniciar").on("click", function () { location.reload(); });
}

// ── iniciarComptador ─────────────────────────────────────────────────
function iniciarComptador() {
    if (intervalTemps) clearInterval(intervalTemps);
    temps = numCartes * 8;
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

// ── barrejar ─────────────────────────────────────────────────────────
function barrejar(cartes) {
    numCartes = nColumnes * nFiles;

    var copia = cartes.slice();
    for (var i = copia.length - 1; i > 0; i--) {
        var j    = Math.floor(Math.random() * (i + 1));
        var temp = copia[i]; copia[i] = copia[j]; copia[j] = temp;
    }

    var cartesUniques = copia.slice(0, numCartes / 2);
    var cartesDobles  = cartesUniques.concat(cartesUniques);

    for (var i = cartesDobles.length - 1; i > 0; i--) {
        var j    = Math.floor(Math.random() * (i + 1));
        var temp = cartesDobles[i]; cartesDobles[i] = cartesDobles[j]; cartesDobles[j] = temp;
    }

    return cartesDobles;
}

// ── Àudio ────────────────────────────────────────────────────────────
function Reproduir() {
    musicaFons.loop   = true;
    musicaFons.volume = $("#sliderVolum").val() / 100;
    musicaFons.play();
}

function canviarVolum(valor) {
    musicaFons.volume = valor / 100;
    if (valor == 0)      $("#iconVolum").text("🔇");
    else if (valor < 50) $("#iconVolum").text("🔉");
    else                 $("#iconVolum").text("🔊");
}

function Correcte()  { soCorrecte.play(); }
function Incorrecte(){ soIncorrecte.play(); }
function Victoria()  { soVictoria.play(); }

function pararMusicaFons() {
    musicaFons.pause();
    musicaFons.currentTime = 0;
}