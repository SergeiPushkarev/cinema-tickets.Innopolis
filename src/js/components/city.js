import {SYPREX_URL, CITYLIST_URL} from "../__data__/city.js"
import {initializeField} from "./input/input.js"
let cityUser
let cityList
const popupCity = document.querySelector('#popup-city')
const cityForm = document.querySelector('#city-form')
const cityInput = document.querySelector('#input-city')
const cityInputLabel = document.querySelector('#input-city').parentNode
const cityBtn = document.querySelector('#city')
const cityClose = document.querySelector('#city-closebtn')
const dropdown = document.getElementById('dropdown')
const cityField = initializeField(cityInputLabel)

document.addEventListener('DOMContentLoaded', ()=>{
    if (!sessionStorage.getItem('city')) {
        getRequest(SYPREX_URL, setCity);
        setTimeout(()=> {
            getRequest(CITYLIST_URL, getCityList)
            popupCity.classList.toggle('hidden')
            cityUser = sessionStorage.getItem('city')
            if (cityUser) {
                cityInput.value = cityUser
            }

        }, 2000)
    }
})
cityBtn.addEventListener('click', function (){
    popupCity.classList.toggle('hidden')
    if (sessionStorage.getItem('city')) {
        cityInput.value = sessionStorage.getItem('city')
    }
});
popupCity.addEventListener('click', function (event) {
    if (event.target.classList == 'popup') {
        popupCity.classList.toggle('hidden')
    }
})
cityClose.addEventListener('click', function (){popupCity.classList.toggle('hidden')});
cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    sessionStorage.setItem('city', cityInput.value)
    popupCity.classList.toggle('hidden')
    
})
cityInput.addEventListener('focus', function(){
    cityField.clearValue()
})
cityInput.addEventListener('keyup', function(){
    if(!cityList) {
        getRequest(CITYLIST_URL, getCityList)
    }
    citySearch(cityInput.value)
})

dropdown.addEventListener('click', e => {
    if (e.target != dropdown) {
        cityInput.value = e.target.textContent
        cityUser = e.target.textContent
        dropdown.classList.add('hidden')
    }
})

popupCity.addEventListener('click', e => {
    if (e.target != popupCity) {
        dropdown.classList.add('hidden')
    }
})


function getRequest (url, clbck){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'text'
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.status != 200) {
            console.log(`Error request`)
        } else if (xhr.readyState == 4) {
            clbck.call(xhr.responseText)
        }
    }
}

function setCity (){
    let data = JSON.parse(this)
    sessionStorage.setItem('city', data.city.name_ru)
}

function getCityList (){
    cityList = JSON.parse(this)
}
function clearChild(element) {
    element.innerHTML = ""
}

function citySearch (string) {
    let counter = 0
    clearChild(dropdown)
    for (const i in cityList) {
        if (cityList[i].city.toLowerCase().indexOf(string.toLowerCase()) > -1 && counter < 5) {
            const cityFind = document.createElement('li')
            cityFind.innerText = cityList[i].city;
            dropdown.append(cityFind)
            dropdown.classList.remove('hidden')
            counter ++
        }
    }
}