import _ from 'underscore';
import { crearDeck, pedirCarta, acumularPuntos, turnoComputadora, crearCarta } from "./usescases";

const miModulo = (() => {
  'use strict';
  
  let deck              = [];
  const tipos           = ['C', 'D', 'H', 'S'],
        especiales      = ['A', 'J', 'Q', 'K'];
  let puntosJugadores   = [];

  // Referencias HTML
  const btnNuevo              = document.querySelector('#btnNuevo'),
        btnPedir              = document.querySelector('#btnPedir'),
        btnDetener            = document.querySelector('#btnDetener'),
        divCartasJugadores    = document.querySelectorAll('.divCartas'),
        puntosHtml            = document.querySelectorAll('small');

  const inicializarJuego = (numJugadores = 2) => {
    console.clear();
    deck = crearDeck(tipos, especiales);
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHtml.forEach(element => element.innerText = 0);
    divCartasJugadores.forEach(element => element.innerHTML = '');
    btnPedir.disabled = false;
    btnDetener.disabled = false; 
    
  }
  //Eventos
  btnNuevo.addEventListener('click', () => {
    inicializarJuego();
  });

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(deck);
    const puntosJugador = acumularPuntos(carta, 0, puntosJugadores, puntosHtml);
    
    crearCarta(carta, 0, divCartasJugadores);

    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador, deck, puntosJugadores, puntosHtml, divCartasJugadores);
    } else if (puntosJugador === 21) {
      console.warn('21 genial');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador, deck, puntosJugadores, puntosHtml, divCartasJugadores);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    (puntosJugadores[0] == 0) ? alert('Tienes que pedir una carta para poder detener el juego') 
                              : turnoComputadora(puntosJugadores[0], deck, puntosJugadores, puntosHtml, divCartasJugadores);
  });

  return {
    nuevoJuego : inicializarJuego
  };
})();