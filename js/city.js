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

const SYPREX_URL = `https://api.sypexgeo.net/`
const CITYLIST_URL = `https://gist.githubusercontent.com/gorborukov/0722a93c35dfba96337b/raw/435b297ac6d90d13a68935e1ec7a69a225969e58/russia`

document.addEventListener('DOMContentLoaded', ()=>{
    getRequest(SYPREX_URL, setCity);
})
cityBtn.addEventListener('click', function (){
    popupToggle(popupCity)
    cityInput.value = city
});
popupCity.addEventListener('click', function (event) {
    if (event.target.classList == 'popup') {
        popupToggle(popupCity)
    }
})
cityClose.addEventListener('click', function (){popupToggle(popupCity)});
cityForm.addEventListener('submit', function(event) {
    event.preventDefault();
    popupToggle(popupCity)
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
    cityInput.value = city
    setTimeout(()=> {popupToggle(popupCity)}, 2000)
    getRequest(CITYLIST_URL, getCityList)
}

function getCityList (){
    cityList = JSON.parse(this)
}
function clearChild(element) {
    element.innerHTML = ""
}

function citySearch (string) {
    counter = 0
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