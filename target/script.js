"use strict";

var brgBtn = document.getElementById('brgBtn');
var mobMenu = document.getElementById('mobilemenu');

//burger button toggle
function menuToggle() {
  brgBtn.classList.toggle('burgermenu__btn-open');
  mobMenu.classList.toggle('mobilemenu-open');
}
brgBtn.onclick = menuToggle;
document.addEventListener('click', function (e) {
  if (!e.composedPath().includes(document.querySelector('.head__nav'))) {
    brgBtn.classList.remove('burgermenu__btn-open');
    mobMenu.classList.remove('mobilemenu-open');
  }
});
var getKinopoiskApiData = function getKinopoiskApiData(url) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991',
      'Content-Type': 'application/json'
    }
  });
};
var getFilmById = function getFilmById(id) {
  return getKinopoiskApiData("https://kinopoiskapiunofficial.tech/api/v2.2/films/".concat(id));
};