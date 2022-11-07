const films = [
    {
        id: 12,
        name: "Человек-паук",
        time: "10:00",
        genres: ["фантастика", "боевик", "приключения"],
        rate: "R",
    },
    {
        name: "Собачья жизнь 2",
        time: "12:00",
        genres: ["фэнтэзи", "драма", "комедия"],
        rate: "R-17",
    },
    {
        name: "История игрушек 4",
        time: "14:00",
        genres: ["мультфильм", "фэнтэзи", "комедия"],
        rate: "R-17",
    },
    {
        name: "Люди в чёрном: [Интэрнэшнл]",
        time: "16:00",
        genres: ["фантастика", "боевик", "комедия"],
        rate: "R-17",
    }
];
let timelist = document.getElementById("timelistBody");

function getRandom(maxVal) {
  return Math.ceil(Math.random()*(maxVal + 1) -2)
}

function getTime (min,max){
  return String(min + getRandom(max-min)).padStart(2, '0')
}


function Film (filmData) {
  this.data = filmData
  this.time = `${getTime(10,23)}:${getTime(0,60)}`
};


Film.prototype.getId = function() {
  return this.data.id || `${this.data.name.replaceAll(" ","-")}-${this.data.time}`;
};
Film.prototype.getName = function (){
  return this.data.name;
};
Film.prototype.getTime = function () {
  return this.time;
};
Film.prototype.getGenres = function () {
  return this.data.genres.join(', ')
};
Film.prototype.isForAdult = function () {
    return this.data.rate !== 'R'
  }
Film.prototype.renderFilmTableItem = function (){
  return `
  <tr>
    <td>
      <label class= "tabcheck relative" for="${this.getId()}">
      <input id="${this.getId()}" class="tabcheck__input" type="checkbox" required>
      <span class="tabcheck__mark">
        <svg
      width="11"
      height="9"
      viewBox="0 0 11 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
        fill="white"
      />
    </svg>
      </span>
    </label>
    </td>
    <td>${this.getTime()}</td>
    <td>${this.getName()}</td>
    <td>${this.getGenres()}</td>
  </tr>
  `
}







// const filmHelper = {
//   getId() {
//     return this.id || `${this.name.replaceAll(" ","-")}-${this.time}`
//   },
//   getName(){
//     return this.name
//   },
//   getTime() {
//     return this.time
//   },
//   getGenres() {
//     return this.genres.join(', ')
//   }
// }

// function renderFilmTableItem (film) {
//   return `
//   <tr>
//     <td>
//       <label class= "tabcheck relative" for="${filmHelper.getId.apply(film)}">
//       <input id="${filmHelper.getId.apply(film)}" class="tabcheck__input" type="checkbox" required>
//       <span class="tabcheck__mark">
//         <svg
//       width="11"
//       height="9"
//       viewBox="0 0 11 9"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         fill-rule="evenodd"
//         clip-rule="evenodd"
//         d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
//         fill="white"
//       />
//     </svg>
//       </span>
//     </label>
//     </td>
//     <td>${filmHelper.getTime.apply(film)}</td>
//     <td>${filmHelper.getName.apply(film)}</td>
//     <td>${filmHelper.getGenres.apply(film)}</td>
//   </tr>
//   `
// }

for (const film of films) {
  const filmItem = new Film (film);
   if (filmItem.isForAdult()) {
    timelist.innerHTML+= filmItem.renderFilmTableItem();}
};