export default class Film {
    constructor (data) {
      this.data = data;
      this.time = `${this.getTime(10,23)}:${this.getTime(0,60)}`;
    };
    renderFilmTableItem(){
      return `
      <tr>
        <td>
          <label class= "tabcheck" for="${this.getId()}">
          <input id="${this.getId()}" class="tabcheck__input" type="checkbox" required>
          <span class="tabcheck__mark relative">
            <svg
              viewBox="0 0 11 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
                d="M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z"
                fill="#a3cc40"
              />
            </svg>
          </span>
        </label>
        </td>
        <td>${this.time}</td>
        <td>${this.getName()}</td>
        <td>${this.getGenres()}</td>
      </tr>
      `
    }
    getId() {
      return this.data.id || `${this.data.name.replaceAll(" ","-")}-${this.data.time}`;
    };
    getName(){
      return this.data.name;
    };
    getGenres() {
      return this.data.genres.join(', ')
    };
    isForAdult() {
      return this.data.rate !== 'R'
    };
    getRandom(maxVal) {
      return Math.ceil(Math.random()*(maxVal + 1) -2)
    };
    getTime (min,max){
      return String(min + this.getRandom(max-min)).padStart(2, '0')
    }
}