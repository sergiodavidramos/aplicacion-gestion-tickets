const socket = io();
const lblTicket1 = $("#lblTicket1");
const lblTicket2 = $("#lblTicket2");
const lblTicket3 = $("#lblTicket3");
const lblTicket4 = $("#lblTicket4");

const lblEscritorio1 = $("#lblEscritorio1");
const lblEscritorio2 = $("#lblEscritorio2");
const lblEscritorio3 = $("#lblEscritorio3");
const lblEscritorio4 = $("#lblEscritorio4");

let lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

socket.on("estadoActual", (data) => {
  actualizaHTML(data.ultimosCuatro);
});
// ultimos4
let on = false;
socket.on("ultimos4", (data) => {
  $("button").on("click", function () {
    on = true;
  });
  if (on) {
    var audio = new Audio("../audio/new-ticket.mp3");
    audio.play();
  }

  actualizaHTML(data);
});

function actualizaHTML(ultimos4) {
  for (let i = 0; i <= ultimos4.length - 1; i++) {
    lblTickets[i].text("Ticket " + ultimos4[i].numero);
    lblEscritorios[i].text("Escritorio " + ultimos4[i].escritorio);
  }
}
