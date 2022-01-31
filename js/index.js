//DECLARACION DE VARIABLES
const listaImagenes = [
  "aubergine",
  "banana",
  "carrots",
  "cherries",
  "dollar",
  "lemon",
  "orange",
  "peach",
  "potato",
  "tomato",
];
const verdurasFrutas = [
  "aubergine",
  "banana",
  "carrots",
  "cherries",
  "lemon",
  "orange",
  "peach",
  "potato",
  "tomato",
];
var monedas = 0;

//OBTENCION ELEMENTOS DEL DOM
var introducirMonedas = document.getElementById("inputMonedas"); //INPUT QUE INTRODUCE MONEDAS
var botonIntroducir = document.getElementById("introducirMonedas"); // BOTON PARA INTRODUCIRLAS
var botonSalir = document.getElementById("salir"); //BOTON SALIR
//HISTORIAL LISTA MOVIMIENTOS
var historial = document.getElementById("listaMovimientos");
//SLOTS DE FRUTAS
var slot1 = document.getElementById("slot1");
var slot2 = document.getElementById("slot2");
var slot3 = document.getElementById("slot3");

//PINTADOS
var monedasActuales = document.getElementById("numeroTotal"); //SPAN EN DONDE SE DIBUJA EL NUMERO TOTAL DE MONEDAS
monedasActuales.innerHTML = 0;
introducirMonedas.value = 0;

/*********
 *EVENTOS*
 *********/

//CONTROL DE MONEDAS
botonIntroducir.addEventListener("click", function () {
  if (introducirMonedas.value < 0) {
    alert("No puedes introducir números negativos");
    vaciarInputMonedas();
  } else {
    monedas += parseInt(introducirMonedas.value);
    monedasActuales.innerHTML = monedas;
    introducirMonedas.disabled = true;
    botonIntroducir.disabled = true;
    vaciarInputMonedas();
    cambiaHistorial("Has introducido monedas");
  }
});

//SACAR MONEDAS
botonSalir.addEventListener("click", function () {
  if (monedasActuales.innerHTML > 0) {
    alert(
      "Has conseguido un total de " + monedasActuales.innerHTML + " monedas"
    );
    introducirMonedas.value = monedasActuales.innerHTML;
    monedasActuales.innerHTML = 0;
    monedas = 0;
    introducirMonedas.disabled = false;
    botonIntroducir.disabled = false;
    cambiaHistorial("Sacas todas las monedas");
  } else {
    alert("No tienes monedas para sacar");
  }
});

//PALANCIA HACIA ABAJO
palanca.addEventListener("mousedown", function () {
  palanca.src = "assets/img/palancaDOWN.png";
  if (monedasActuales.innerHTML > 0) {
    monedasActuales.innerHTML -= 1;
  }
});

//PALANCA HACIA ARRIBA
palanca.addEventListener("mouseup", function () {
  palanca.src = "assets/img/palancaUP.png";
  if (monedasActuales.innerHTML > 0) {
    cambiaHistorial("Gastas monedas");
    cambiaImagen(slot1, slot2, slot3);
    comparacion(slot1, slot2, slot3);
  } else {
    alert("Necesitas introducir monedas para jugar");
  }
});

/***********************
 * FUNCIONES AUXILIARES*
 ***********************/
function cambiaHistorial(mensaje) {
  return (historial.innerHTML += `<li>${mensaje}</li>`);
}

function vaciarInputMonedas() {
  introducirMonedas.value = 0;
}

function aleatorio(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function devuelveImagen() {
  return listaImagenes[aleatorio(0, 9)];
}

function cambiaImagen(imagen, imagen2, imagen3) {
  let imagenes = [devuelveImagen(), devuelveImagen(), devuelveImagen()];

  imagen.src = "assets/img/" + imagenes[0] + ".png";
  imagen.setAttribute("alt", imagenes[0]);

  imagen2.src = "assets/img/" + imagenes[1] + ".png";
  imagen2.setAttribute("alt", imagenes[1]);

  imagen3.src = "assets/img/" + imagenes[2] + ".png";
  imagen3.setAttribute("alt", imagenes[2]);
}

function comparacion(source, source2, source3) {
  if (
    (source.getAttribute("alt") == "dollar" &&
      verdurasFrutas.indexOf(source2.getAttribute("alt")) ==
        verdurasFrutas.indexOf(source3.getAttribute("alt"))) ||
    (verdurasFrutas.indexOf(source.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source2.getAttribute("alt")) &&
      source3.getAttribute("alt") == "dollar") ||
    (source2.getAttribute("alt") == "dollar" &&
      verdurasFrutas.indexOf(source.getAttribute("alt")) ==
        verdurasFrutas.indexOf(source3.getAttribute("alt")))
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 3;
    cambiaHistorial("¡MONEDA Y DOS IGUALES! Ganas 3 monedas");
  } else if (
    source.getAttribute("alt") == "dollar" &&
    source2.getAttribute("alt") == "dollar" &&
    source3.getAttribute("alt") == "dollar"
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 10;
    cambiaHistorial("¡TRES MONEDAS! Ganas diez monedas");
  } else if (
    (source.getAttribute("alt") == "dollar" &&
      source2.getAttribute("alt") == "dollar") ||
    (source2.getAttribute("alt") == "dollar" &&
      source3.getAttribute("alt") == "dollar") ||
    (source.getAttribute("alt") == "dollar" &&
      source3.getAttribute("alt") == "dollar")
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 4;
    cambiaHistorial("¡DOS MONEDAS! Ganas 4 monedas");
  } else if (
    source.getAttribute("alt") == "dollar" ||
    source2.getAttribute("alt") == "dollar" ||
    source3.getAttribute("alt") == "dollar"
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 1;
    cambiaHistorial("¡Una moneda! Ganas una moneda");
  } else if (
    verdurasFrutas.indexOf(source.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source2.getAttribute("alt")) &&
    verdurasFrutas.indexOf(source2.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source3.getAttribute("alt"))
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 5;
    cambiaHistorial("¡TRES IGUALES! Ganas 5 monedas");
  } else if (
    verdurasFrutas.indexOf(source.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source2.getAttribute("alt")) ||
    verdurasFrutas.indexOf(source.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source3.getAttribute("alt")) ||
    verdurasFrutas.indexOf(source2.getAttribute("alt")) ==
      verdurasFrutas.indexOf(source3.getAttribute("alt"))
  ) {
    monedasActuales.innerHTML = parseInt(monedasActuales.innerHTML) + 2;
    cambiaHistorial("¡Dos iguales! Ganas 2 monedas");
  }
}
