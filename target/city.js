"use strict";

var city;
var cityList;
var popupCity = document.querySelector('#popup-city');
var cityForm = document.querySelector('#city-form');
var cityInput = document.querySelector('#input-city');
var cityInputLabel = document.querySelector('#input-city').parentNode;
var cityBtn = document.querySelector('#city');
var cityClose = document.querySelector('#city-closebtn');
var dropdown = document.getElementById('dropdown');
var cityField = initializeField(cityInputLabel);
var SYPREX_URL = "https://api.sypexgeo.net/";
var CITYLIST_URL = "https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia";
document.addEventListener('DOMContentLoaded', function () {
  getRequest(SYPREX_URL, setCity);
});
cityBtn.addEventListener('click', function () {
  popupToggle(popupCity);
  cityInput.value = city;
});
popupCity.addEventListener('click', function (event) {
  if (event.target.classList == 'popup') {
    popupToggle(popupCity);
  }
});
cityClose.addEventListener('click', function () {
  popupToggle(popupCity);
});
cityForm.addEventListener('submit', function (event) {
  event.preventDefault();
  popupToggle(popupCity);
});
cityInput.addEventListener('focus', function () {
  cityField.clearValue();
});
cityInput.addEventListener('keyup', function () {
  citySearch(cityInput.value);
});
dropdown.addEventListener('click', function (e) {
  if (e.target != dropdown) {
    cityInput.value = e.target.textContent;
    city = e.target.textContent;
    dropdown.classList.add('hidden');
  }
});
popupCity.addEventListener('click', function (e) {
  if (e.target != popupCity) {
    dropdown.classList.add('hidden');
  }
});
function getRequest(url, clbck) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'text';
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.status != 200) {
      console.log("Error request");
    } else if (xhr.readyState == 4) {
      clbck.call(xhr.responseText);
    }
  };
}
function setCity() {
  var data = JSON.parse(this);
  city = data.city.name_ru;
  cityInput.value = city;
  setTimeout(function () {
    popupToggle(popupCity);
  }, 2000);
  getRequest(CITYLIST_URL, getCityList);
}
function getCityList() {
  cityList = JSON.parse(this);
}
function clearChild(element) {
  element.innerHTML = "";
}
function citySearch(string) {
  counter = 0;
  clearChild(dropdown);
  for (var i in cityList) {
    if (cityList[i].city.toLowerCase().indexOf(string.toLowerCase()) > -1 && counter < 5) {
      var cityFind = document.createElement('li');
      cityFind.innerText = cityList[i].city;
      dropdown.append(cityFind);
      dropdown.classList.remove('hidden');
      counter++;
    }
  }
}