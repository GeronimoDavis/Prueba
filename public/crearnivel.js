let filasInput = document.querySelector("#filas");
let columnasInput = document.querySelector("#columnas");
let botonGuardar = document.querySelector("#guardarMapa");
let botonMostrarMap = document.querySelector("#botonMostrar");
const mapaDiv = document.querySelector("#divMapa");

botonGuardar.style.display = "none";

let filas;
let columnas;
let arrayMapa = [];

botonMostrarMap.addEventListener("click", function () {
  botonMostrarMap.style.display = "none";

  filas = Number(filasInput.value);
  columnas = Number(columnasInput.value);

  // Inicializar el array
  arrayMapa = [];
  for (let i = 0; i < filas; i++) {
    arrayMapa[i] = []; // se asegura de que cada fila sea un array
    for (let j = 0; j < columnas; j++) {
      arrayMapa[i][j] = 0; // Asignar un valor a cada celda
    }
  }

  DibujarMapa(arrayMapa);
  botonGuardar.style.display = "inline";
});

botonGuardar.addEventListener("click", function () {
  botonGuardar.style.display = "none";
  console.log(arrayMapa);

  fetch("/guardar-nivel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arrayMapa),
  })
    .then((data) => {
      arrayMapa = [];
      DibujarMapa(arrayMapa);
      botonMostrarMap.style.display = "inline";
      alert("Nivel guardado");
    })
    .catch((error) => {
      console.log("Error al guardar el nivel:", error);
    });
});

function DibujarMapa(mapaLaberinto) {
  mapaDiv.innerHTML = "";

  for (let i = 0; i < mapaLaberinto.length; i++) {
    let filaLaberinto = document.createElement("div"); //Crea un nuevo elemento div para la fila, Este div actúa como un contenedor para las celdas de esa fila específica.
    filaLaberinto.classList.add("fila-laberinto"); // Añade una clase CSS para estilizar la fila.
    for (let j = 0; j < mapaLaberinto[i].length; j++) {
      let celda = document.createElement("div");
      celda.classList.add("celda");
      if (mapaLaberinto[i][j] == 1) {
        celda.classList.add("pared");
      } else if (mapaLaberinto[i][j] == 2) {
        celda.classList.add("jugador");
      } else if (mapaLaberinto[i][j] == 3) {
        celda.classList.add("salida");
      }

      celda.addEventListener("click", function () {
        if (mapaLaberinto[i][j] == 0) {
          celda.classList.remove("jugador", "salida");
          celda.classList.add("pared");
          mapaLaberinto[i][j] = 1;
        } else if (mapaLaberinto[i][j] == 1) {
          if (masUnJugador()) {
            celda.classList.remove("pared", "salida");
            celda.classList.add("jugador");
            mapaLaberinto[i][j] = 2;
          } else {
            celda.classList.remove("pared", "juador");
            celda.classList.add("salida");
            mapaLaberinto[i][j] = 3;
          }
        } else if (mapaLaberinto[i][j] == 2) {
          celda.classList.remove("pared", "juador");
          celda.classList.add("salida");
          mapaLaberinto[i][j] = 3;
        } else if (mapaLaberinto[i][j] == 3) {
          celda.classList.remove("pared", "jugador", "salida");
          mapaLaberinto[i][j] = 0;
        }
      });

      filaLaberinto.appendChild(celda);
    }

    mapaDiv.appendChild(filaLaberinto);
  }
}

function masUnJugador() {
  contador = 1;
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      if (arrayMapa[i][j] == 2) {
        contador += 1;
      }
    }
  }

  if (contador > 1) {
    return false;
  } else {
    return true;
  }
}
