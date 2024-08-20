const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
const fs = require("fs");

app.get("/crear-nivel", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "crearnivel.html"));
});

app.get("/laberintojugar", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "Laberinto.html"));
});

app.post("/guardar-nivel", (req, res) => {
  let cantidadNiveles = 0;

  fs.readdirSync("./niveles").forEach((file) => {
    cantidadNiveles++;
  });

  let nivel = req.body;
  let nivelJSON = JSON.stringify(nivel);
  console.log(nivelJSON);
  fs.writeFileSync(`./niveles/nivel${cantidadNiveles + 1}.json`, nivelJSON);

  res.json({ cantidadNiveles });
});

app.get("/ver-nivel", (req, res) => {
  let contenidoArchivo = [];

  fs.readdirSync("./niveles").forEach((file) => {
    let nivel = fs.readFileSync(`./niveles/${file}`, "utf-8");
    contenidoArchivo.push(nivel);
  });

  res.json(contenidoArchivo);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
