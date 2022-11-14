"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var films = [{
  id: 12,
  name: "Человек-паук",
  time: "10:00",
  genres: ["фантастика", "боевик", "приключения"],
  rate: "R-17"
}, {
  id: 12,
  name: "Человек-паук",
  time: "10:00",
  genres: ["фантастика", "боевик", "приключения"],
  rate: "R"
}, {
  name: "Собачья жизнь 2",
  time: "12:00",
  genres: ["фэнтэзи", "драма", "комедия"],
  rate: "R-17"
}, {
  name: "История игрушек 4",
  time: "14:00",
  genres: ["мультфильм", "фэнтэзи", "комедия"],
  rate: "R-17"
}, {
  name: "Люди в чёрном: [Интэрнэшнл]",
  time: "16:00",
  genres: ["фантастика", "боевик", "комедия"],
  rate: "R-17"
}];
var timelist = document.getElementById("timelistBody");
function getRandom(maxVal) {
  return Math.ceil(Math.random() * (maxVal + 1) - 2);
}
var Film = /*#__PURE__*/function () {
  function Film(data) {
    _classCallCheck(this, Film);
    this.data = data;
    this.time = "".concat(this.getTime(10, 23), ":").concat(this.getTime(0, 60));
  }
  _createClass(Film, [{
    key: "renderFilmTableItem",
    value: function renderFilmTableItem() {
      return "\n    <tr>\n      <td>\n        <label class= \"tabcheck relative\" for=\"".concat(this.getId(), "\">\n        <input id=\"").concat(this.getId(), "\" class=\"tabcheck__input\" type=\"checkbox\" required>\n        <span class=\"tabcheck__mark\">\n          <svg\n        width=\"11\"\n        height=\"9\"\n        viewBox=\"0 0 11 9\"\n        fill=\"none\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          fill-rule=\"evenodd\"\n          clip-rule=\"evenodd\"\n          d=\"M4.60581 6.79378L1.46056 3.93033L0.787354 4.66979L4.70255 8.23421L10.8223 0.94099L10.0562 0.298203L4.60581 6.79378Z\"\n          fill=\"white\"\n        />\n      </svg>\n        </span>\n      </label>\n      </td>\n      <td>").concat(this.time, "</td>\n      <td>").concat(this.getName(), "</td>\n      <td>").concat(this.getGenres(), "</td>\n    </tr>\n    ");
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.data.id || "".concat(this.data.name.replaceAll(" ", "-"), "-").concat(this.data.time);
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.data.name;
    }
  }, {
    key: "getGenres",
    value: function getGenres() {
      return this.data.genres.join(', ');
    }
  }, {
    key: "isForAdult",
    value: function isForAdult() {
      return this.data.rate !== 'R';
    }
  }, {
    key: "getRandom",
    value: function getRandom(maxVal) {
      return Math.ceil(Math.random() * (maxVal + 1) - 2);
    }
  }, {
    key: "getTime",
    value: function getTime(min, max) {
      return String(min + getRandom(max - min)).padStart(2, '0');
    }
  }]);
  return Film;
}();
for (var _i = 0, _films = films; _i < _films.length; _i++) {
  var film = _films[_i];
  var filmItem = new Film(film);
  if (filmItem.isForAdult()) {
    timelist.innerHTML += filmItem.renderFilmTableItem();
  }
}
;
//# sourceMappingURL=film-table.js.map