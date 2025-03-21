/**
 * Esta funcion me permite pedir una carta 
 * @param {Array<String>} deck es un arreglo de strings
 * @returns {String} retorna la carta del deck
 */
export const pedirCarta = (deck) => {
  if (deck.length === 0) {
    throw 'No hay mas cartas en el deck';
  }
  return deck.pop();
}