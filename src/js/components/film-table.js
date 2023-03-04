import Film from "../model/film.js"
import {films} from "../__data__/mocks.js"
function renderTimelist(id) {
  const timelist = document.getElementById(id)
  for (const film of films) {
    const filmItem = new Film (film);
     if (filmItem.isForAdult()) {
      timelist.innerHTML+= filmItem.renderFilmTableItem();}
  };
}
export {renderTimelist}