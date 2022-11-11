const movieConteiner = document.getElementById('movie__container');
movieConteiner.innerHTML = "";

fetch ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
    headers: {
        accept: 'application/json',
        'X-API-KEY':'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
    }
}).then(answer => answer.json())
.then(data => {
    data.films.forEach(film => {
    const movieDescrId = `descr__text${film.filmId}`;
    movieConteiner.innerHTML += `
    <div class="movie__item">
        <div class="movie__item-bg">
        <img
            src="${film.posterUrlPreview}"
            alt="Выживший"
            width="283"
            height="283"
        />
        </div>
        <div class="movie__item-shadow"></div>
        <a class="movie__item-descr link__white" target="_blank" href="https://www.kinopoisk.ru/film/522941/">
        <div class="descr__head">${film.nameRu}</div>
        <div id="${movieDescrId}"class="descr__text">
           
        </div>
        </a>
    </div>`;
    fetch (`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}`, {
        headers: {
            accept: 'application/json',
            'X-API-KEY':'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
        }
    }).then(answer => answer.json())
    .then(dataFilmId => {
        const descrElement = document.getElementById(movieDescrId);
        descrElement.innerText = dataFilmId.description;
        if (!dataFilmId.description) {
            movieConteiner.removeChild(descrElement.parentNode.parentNode);
        }
    })
   });
});


    
    