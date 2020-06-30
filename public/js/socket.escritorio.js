// comando para establecer la conexion

const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("En escritorio es necesario");
}

const escritorio = searchParams.get("escritorio");
const label = $("small");

console.log(escritorio);
$("h1").text("Escritorio " + escritorio);

$("button").on("click", function () {
  socket.emit("atenderTicket", { escritorio }, (resp) => {
    // var audio = new Audio("../audio/new-ticket.mp3");
    // audio.play();

    if (resp.numero === undefined) label.text("No hay tickets por atender");
    else label.text("Ticket: " + resp.numero);
  });
});
