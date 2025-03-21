import { valorCarta } from "./";

// Turno: 0 primer jugador y el ultimo sera la computadora
export const acumularPuntos = (carta, turno, puntosJugadores, puntosHtml) => {  
  puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
  puntosHtml[turno].innerText = puntosJugadores[turno];
  return puntosJugadores[turno];
}