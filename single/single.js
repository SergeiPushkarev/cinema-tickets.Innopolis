import "https://code.jquery.com/jquery-3.6.0.min.js"
import "../libs/owl.carousel.min.js"
import {getFilmById,getFilmInfo,getSimilarGenres,getGenreList} from "../js/__data__/kinopoisk.js"
import "../js/components/burger.js"
// const innologo = document.querySelector('.head__logo')
// innologo.href = "/imdex.html"
const filmLogo = document.getElementById('film__logo')
const cardInfoWrap = document.getElementById('card-info')
const info = new URLSearchParams(location.search);
const infoId = info.get('id');
const otherItemFilms = document.getElementById('other__wrap')


function renderFilmLogo (posterUrl){
    const logoImg = document.createElement('img');
    logoImg.alt = 'poster'
    logoImg.src = posterUrl
    if (posterUrl) {
        filmLogo.innerHTML = "";
        filmLogo.append(logoImg)
    }
}
function renderFilmName (name) {
    const cardName = document.getElementById('card-name')
    cardName.classList.remove('skeleton-string')
    cardName.innerHTML = `${name}`
}
function renderFilmDescr (descr) {
    const cardDescr = document.getElementById('card-descr')
    cardDescr.classList.remove('skeleton-string')
    cardDescr.innerText = `${descr}`
}
function renderCardInfo (title, value) {
    const infoCard = document.createElement('div')
    infoCard.classList.add('card-info__item')
    const infoTitle = document.createElement('div')
    infoTitle.classList.add('card-info__item-title')
    infoTitle.innerText = title
    const infoValue = document.createElement('div')
    infoValue.classList.add('card-info__item-value')
    infoValue.innerText = value
    infoCard.append(infoTitle, infoValue)
    if (value) {cardInfoWrap.append(infoCard)}
}
function renderOtherItem (genre){
    const otherItem = document.createElement('div')
    const header = document.createElement('div')
    header.innerText = genre
    header.classList.add('other__item-header')
    const wrapper = document.createElement('div')
    wrapper.classList.add('other__item-wrapper')
    otherItem.append(header,wrapper)
    otherItemFilms.append(otherItem)
    return wrapper
}

function renderOtherCard(filmName, poster, year, id) {
    const link = document.createElement('a');
    link.href = `/single/?id=${id}`
    const card = document.createElement('div');
    card.classList.add('card');
    const logo = document.createElement('div');
    logo.className = 'card-item card-logo';
    const img = document.createElement('img');
    img.src = poster;
    img.alt = 'poster';
    logo.append(img);
    const title = document.createElement('div');
    title.className = 'card-item card-title';
    title.innerText = filmName;
    const filmYear = document.createElement('div');
    filmYear.className = 'card-item card-year';
    filmYear.innerText = `${year}`;
    link.append(logo,title,filmYear)
    card.append(link)
    return card
};

function getCountry(response){
    return response.countries.flatMap(a=> Object.values(a))
};

function getCardInfo (x,y){
    const prof = ["DIRECTOR","ACTOR","WRITER","PRODUCER","OPERATOR","COMPOSER","DESIGN"];
    prof.forEach(a => {
    const title = x.filter(val => {
        return val.professionKey == a;
    })[0].professionText;
    const value = x.filter(val => {
        return val.professionKey == a;
    }).slice(0,5).map(a=>a.nameRu);
    if(value&&title) (renderCardInfo(title, value))
    });
    const dataTime = y.filmLength
    const time = `${dataTime} мин./ ${String(Math.round(dataTime/60)).padStart(2,'0')}:${String(dataTime%60).padStart(2,'0')}`;
    if(time) {renderCardInfo('Время', time)} else {renderCardInfo('Время', "...")}
};

async function getGenreId(filmGenre) {
    const genresList = await getGenreList().then(d=>d.json())
    const id = Number(genresList.genres.find(i => i.genre == filmGenre.genre).id)
    return id
}

function getOwlOther (other, i) {
    let owlClass = `slide${i}`
    other.classList.add('owl-carousel')
    other.classList.add(owlClass)
    $(document).ready(function(){
        $(`.${owlClass}`).owlCarousel({
            items: 6,
            nav: true,
            dots: false,
        });
    })
;}

const getOtherBlock = async (genres, i) => {
    const wrap = renderOtherItem(genres.genre)
    const genreId = await getGenreId(genres)
    const similarFilms = await getSimilarGenres(genreId).then(a=>a.json())
    const otherItem = document.createElement('div')
    otherItem.className = ('other__item-films')
    wrap.append(otherItem)
    getOwlOther(otherItem, i)
    similarFilms.items.slice(0,7).forEach(a=>{
        otherItem.append(renderOtherCard(a.nameRu, a.posterUrlPreview, a.year, a.kinopoiskId))
    });
    
}

const getFilmCardBlock = async () => {
    cardInfoWrap.innerHTML = '';
    const data = await getFilmById(infoId).then(d=>d.json());
    const info = await getFilmInfo(infoId).then(c=>c.json());
    try {
        renderFilmLogo(data.posterUrl);
        renderFilmName(data.nameRu);
        renderFilmDescr(data.description);
    } catch (error) {
        console.log (error)
    };
    try {
        renderCardInfo('Страна',getCountry(data));
        getCardInfo(info, data);
    } catch (error) {
        console.log (error)
    };
    otherItemFilms.innerHTML = ""
    data.genres.slice(0,2).forEach((a, i)=>getOtherBlock(a, i))
};
// getFilmCardBlock();

$(document).ready(function(){
    $(".other__item-films").owlCarousel({
        loop: true,
        items: 6,
        nav: true,
        dots: false,
    });
})