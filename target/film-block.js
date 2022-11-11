"use strict";

var movieConteiner = document.getElementById('movie__container');
movieConteiner.innerHTML = "";
fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
  }
}).then(function (answer) {
  return answer.json();
}).then(function (data) {
  data.films.forEach(function (film) {
    var movieDescrId = "descr__text".concat(film.filmId);
    movieConteiner.innerHTML += "\n    <div class=\"movie__item\">\n        <div class=\"movie__item-bg\">\n        <img\n            src=\"".concat(film.posterUrlPreview, "\"\n            alt=\"\u0412\u044B\u0436\u0438\u0432\u0448\u0438\u0439\"\n            width=\"283\"\n            height=\"283\"\n        />\n        </div>\n        <div class=\"movie__item-shadow\"></div>\n        <a class=\"movie__item-descr link__white\" target=\"_blank\" href=\"https://www.kinopoisk.ru/film/522941/\">\n        <div class=\"descr__head\">").concat(film.nameRu, "</div>\n        <div id=\"").concat(movieDescrId, "\"class=\"descr__text\">\n           \n        </div>\n        </a>\n    </div>");
    fetch("https://kinopoiskapiunofficial.tech/api/v2.2/films/".concat(film.filmId), {
      headers: {
        accept: 'application/json',
        'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
      }
    }).then(function (answer) {
      return answer.json();
    }).then(function (dataFilmId) {
      var descrElement = document.getElementById(movieDescrId);
      descrElement.innerText = dataFilmId.description;
      if (!dataFilmId.description) {
        movieConteiner.removeChild(descrElement.parentNode.parentNode);
      }
    });
  });
});