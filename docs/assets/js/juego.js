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
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    puntosHtml.forEach(element => element.innerText = 0);
    divCartasJugadores.forEach(element => element.innerHTML = '');
    btnPedir.disabled = false;
    btnDetener.disabled = false; 
  }

  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10 ; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  }

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay mas cartas en el deck';
    }
    return deck.pop();
  }

  const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length - 1);
    return (isNaN(valor)) ? 
            ((valor === 'A') ? 11 : 10) 
              : valor * 1;
  }

  // Turno: 0 primer jugador y el ultimo sera la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;
    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gana :(');
      } else if (puntosMinimos > 21) {
        alert('Computadora gana');
      } else if (puntosComputadora > 21) {
        alert('Jugador gana');
      } else {
        alert('Computadora gana');
      }
    },200);
  }

  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, (puntosJugadores.length - 1));
      crearCarta(carta, (puntosJugadores.length - 1));

      if (puntosMinimos > 21) {
        break;
      } 
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    determinarGanador();
  }
  //Eventos
  btnNuevo.addEventListener('click', () => {
    inicializarJuego();
  });

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn('Lo siento mucho, perdiste');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      console.warn('21 genial');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    (puntosJugadores[0] == 0) ? alert('Tienes que pedir una carta para poder detener el juego') 
                              : turnoComputadora(puntosJugadores[0]);
  });

  return {
    nuevoJuego : inicializarJuego
  };
})();