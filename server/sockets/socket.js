const { io } = require("../server");
const { TicketControl } = require("../classes/ticket-control");

const ticketControl = new TicketControl();
io.on("connection", (client) => {
  client.on("siguienteTicket", (data, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);
  });
  //   Emitir un evento 'estado actual
  client.emit("estadoActual", {
    actual: ticketControl.getUltimoTicket(),
    ultimosCuatro: ticketControl.getUltimosCuatro(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        message: "El escritorio es necesario",
      });
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    // actualizar / notificar cambios en los ultimos 4
    client.broadcast.emit("ultimos4", ticketControl.getUltimosCuatro());
  });
});
