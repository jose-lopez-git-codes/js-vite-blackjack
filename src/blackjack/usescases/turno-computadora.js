import { acumularPuntos, crearCarta, pedirCarta, determinarGanador } from "./";


export const turnoComputadora = (puntosMinimos, deck, puntosJugadores, puntosHtml, divCartasJugadores) => {
  let puntosComputadora = 0;
  do {
    const carta = pedirCarta(deck);
    puntosComputadora = acumularPuntos(carta, (puntosJugadores.length - 1), puntosJugadores, puntosHtml);
    crearCarta(carta, (puntosJugadores.length - 1), divCartasJugadores);

    if (puntosMinimos > 21) {
      break;
    } 
  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
  determinarGanador(puntosJugadores);
}