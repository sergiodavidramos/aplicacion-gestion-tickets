// comando para establecer la conexion

const socket = io();
const label = $("#lblNuevoTicket");

socket.on("connect", () => {
  console.log("conectado al servidor");
});
socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

$("button").on("click", function () {
  socket.emit("siguienteTicket", null, (siguienteTicket) => {
    label.text(siguienteTicket);
  });
});
socket.on("estadoActual", (respuesta) => {
  label.text(respuesta.actual);
});
