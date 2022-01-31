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
var monedas = 0;

//OBTENCION ELEMENTOS DEL DOM
var introducirMonedas = document.getElementById("inputMonedas"); //INPUT QUE INTRODUCE MONEDAS
var botonIntroducir = document.getElementById("introducirMonedas"); // BOTON PARA INTRODUCIRLAS
var botonSalir = document.getElementById("salir"); //BOTONSALIR
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
    cambiaHistorial("Sacas todas las monedas");
  } else {
    alert("No tienes monedas para sacar");
  }
});

//PALANCIA HACIA ABAJO

palanca.addEventListener("mousedown", function () {
  if (monedasActuales.innerHTML == 0) {
    alert("Por favor, introduce monedas");
  } else {
    palanca.src = "assets/img/palancaDOWN.png";
    monedasActuales.innerHTML -= 1;
    historial.innerHTML += "<li>Gastas monedas</li>";
  }
});

//PALANCA HACIA ARRIBA
palanca.addEventListener("mouseup", function () {
  if (monedasActuales.innerHTML > 0) {
    palanca.src = "assets/img/palancaUP.png";
    cambiaImagen(slot1, slot2, slot3);
    console.log(slot1.src);
    if (slot1.src == "assets/img/dollar.png") {
      alert("si");
    }
  }
});

/***********************
 * FUNCIONES AUXILIARES*
 ***********************/
function cambiaHistorial(mensaje) {
  historial.innerHTML += `<li>${mensaje}</li>`;
}

function vaciarInputMonedas() {
  introducirMonedas.value = 0;
}

function aleatorio(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function cambiaImagen(source, source2, source3) {
  source.src = "assets/img/" + devuelveImagen() + ".png";
  source2.src = "assets/img/" + devuelveImagen() + ".png";
  source3.src = "assets/img/" + devuelveImagen() + ".png";
}

function devuelveImagen() {
  return listaImagenes[aleatorio(0, 9)];
}
