import {SYPREX_URL, CITYLIST_URL} from "../__data__/city.js"
import {initializeField} from "../components/input.js"
let city
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
    getRequest(SYPREX_URL, setCity);
    setTimeout(()=> {
        if (!city){
            getRequest(CITYLIST_URL, getCityList)
            // cityInput.value = ""
            popupCity.classList.toggle('hidden')
        }
    }, 2000)
})
cityBtn.addEventListener('click', function (){
    popupCity.classList.toggle('hidden')
    if (!city) {
        // cityInput.value = ""
    } else cityInput.value = city
});
popupCity.addEventListener('click', function (event) {
    if (event.target.classList == 'popup') {
        popupCity.classList.toggle('hidden')
    }
})
cityClose.addEventListener('click', function (){popupCity.classList.toggle('hidden')});
cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    popupCity.classList.toggle('hidden')
})
cityInput.addEventListener('focus', function(){
    cityField.clearValue()
})
cityInput.addEventListener('keyup', function(){
    citySearch(cityInput.value)
})

dropdown.addEventListener('click', e => {
    if (e.target != dropdown) {
        cityInput.value = e.target.textContent
        city = e.target.textContent
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
    city = data.city.name_ru
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