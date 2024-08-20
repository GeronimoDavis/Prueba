const mapaDiv = document.querySelector("#mapaLaberinto");
let mapa = [];

let nivel = { nivelActual: 0, niveles: [] };

async function cargarNiveles() {
  const response = await fetch("http://localhost:3000/ver-nivel");
  const nivels = await response.json();

  const nivelesCo = nivels.map((nivel) => JSON.parse(nivel.replace(/"/g, "")));

  nivel.niveles = nivelesCo;
  nivelElegir();
  DibujarMapa(mapa);
}

function nivelElegir() {
  mapa = [];
  if (nivel.nivelActual >= nivel.niveles.length) {
    alert("Ganaste todos los niveles!!");
  } else {
    mapa = nivel.niveles[nivel.nivelActual];
  }
}

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

      filaLaberinto.appendChild(celda);
    }

    mapaDiv.appendChild(filaLaberinto);
  }
}

function ubicacionJugador(mapaLaberinto) {
  for (let i = 0; i < mapaLaberinto.length; i++) {
    for (let j = 0; j < mapaLaberinto[i].length; j++) {
      if (mapaLaberinto[i][j] == 2) {
        return [i, j];
      }
    }
  }
}

document.addEventListener("keydown", function (evento) {
  let ubicacion = ubicacionJugador(mapa);
  if (evento.key === "w") {
    if (mapa[ubicacion[0] - 1][ubicacion[1]] === 0) {
      mapa[ubicacion[0]][ubicacion[1]] = 0;
      mapa[ubicacion[0] - 1][ubicacion[1]] = 2;
    } else if (mapa[ubicacion[0] - 1][ubicacion[1]] === 3) {
      alert("Ganaste!!");
      nivel.nivelActual += 1;
      nivelElegir();
    }
  } else if (evento.key === "d") {
    if (mapa[ubicacion[0]][ubicacion[1] + 1] === 0) {
      mapa[ubicacion[0]][ubicacion[1]] = 0;
      mapa[ubicacion[0]][ubicacion[1] + 1] = 2;
    } else if (mapa[ubicacion[0]][ubicacion[1] + 1] === 3) {
      alert("Ganaste!!");
      nivel.nivelActual += 1;
      nivelElegir();
    }
  } else if (evento.key === "s") {
    if (mapa[ubicacion[0] + 1][ubicacion[1]] === 0) {
      mapa[ubicacion[0]][ubicacion[1]] = 0;
      mapa[ubicacion[0] + 1][ubicacion[1]] = 2;
    } else if (mapa[ubicacion[0] + 1][ubicacion[1]] === 3) {
      alert("Ganaste!!");
      nivel.nivelActual += 1;
      nivelElegir();
    }
  } else if (evento.key === "a") {
    if (mapa[ubicacion[0]][ubicacion[1] - 1] === 0) {
      mapa[ubicacion[0]][ubicacion[1]] = 0;
      mapa[ubicacion[0]][ubicacion[1] - 1] = 2;
    } else if (mapa[ubicacion[0]][ubicacion[1] - 1] === 3) {
      alert("Ganaste!!");
      nivel.nivelActual += 1;
      nivelElegir();
    }
  }
  if (mapa == undefined) {
  } else {
    DibujarMapa(mapa);
  }
});

function iniciarJuego() {
  cargarNiveles();
}

iniciarJuego();
