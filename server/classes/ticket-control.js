const fs = require("fs");
const { TLSSocket } = require("tls");
class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimosCuatro = [];

    const data = require("../data/data.json");

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimosCuatro = data.ultimosCuatro;
    } else {
      this.reiniciarConteo();
    }
  }

  siguiente() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.gravarArchivo();

    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }
  getUltimosCuatro() {
    return this.ultimosCuatro;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) return "No hay tickets";

    const numeroTicket = this.tickets[0].numero;
    // burra el primer dato del array
    this.tickets.shift();

    let atenderTicket = new Ticket(numeroTicket, escritorio);

    this.ultimosCuatro.unshift(
      atenderTicket
    ); /* agrega al inicio del arreglo */
    if (this.ultimosCuatro.length > 4) {
      this.ultimosCuatro.splice(-1, 1); /* Borra el ultimo elemento */
    }
    console.log("Ultimos 4");
    console.log(this.ultimosCuatro);

    this.gravarArchivo();

    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimosCuatro = [];

    console.log("se ha inicializado el sistema");
    this.gravarArchivo();
  }
  gravarArchivo() {
    const jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro: this.ultimosCuatro,
    };
    const jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl,
};
