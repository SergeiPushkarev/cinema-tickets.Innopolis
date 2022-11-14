const movieConteiner = document.getElementById('movie__container');
movieConteiner.innerHTML = "";

const getKinopoiskApiData = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991',
            'Content-Type': 'application/json'
        }
    });   
};
const getTopFilms = () => {
    return getKinopoiskApiData('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1')
};
const getFilmById = (id) => {
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
};

const getBlockFilmsData = async () => {
    try {
        const answer = await getTopFilms();
        const data = await answer.json();
        data.films.forEach(async (film) => {
            const itemWrap = document.createElement('div');
            itemWrap.classList.add('movie__item');
            movieConteiner.append(itemWrap);
            const itemBg = document.createElement('div');
            itemBg.classList.add('movie__item-bg');
            const shadow = document.createElement('div');
            shadow.classList.add('movie__item-shadow');
            const itemDescr = document.createElement('a');
            itemDescr.className ='movie__item-descr link__white';
            itemWrap.append(itemBg,shadow,itemDescr);
            const imgBg = document.createElement('img');
            imgBg.src = film.posterUrlPreview;
            imgBg.width = '283px';
            itemBg.append(imgBg);
            const descrHead = document.createElement('div');
            const descrTxt = document.createElement('div');
            descrHead.classList.add('descr__head');
            descrHead.innerText = film.nameRu;
            descrTxt.classList.add('descr__text');
            descrTxt.innerText = '..loading..';
            itemDescr.append(descrHead,descrTxt);
            const answer = await getFilmById(film.filmId);
            const dataFilmId = await answer.json();
            descrTxt.innerText = dataFilmId.description;
            if (!dataFilmId.description) {
                itemWrap.remove();
            };
        });
    } catch(error) {
        console.error(error)
    }
};
getBlockFilmsData();


// const movieDescrId = `descr__text${film.filmId}`;
//             movieConteiner.innerHTML += `
//             <div class="movie__item">
//                 <div class="movie__item-bg">
//                 <img
//                     src="${film.posterUrlPreview}"
//                     alt="Выживший"
//                     width="283"
//                     height="283"
//                 />
//                 </div>
//                 <div class="movie__item-shadow"></div>
//                 <a class="movie__item-descr link__white" target="_blank" href="https://www.kinopoisk.ru/film/522941/">
//                 <div class="descr__head">${film.nameRu}</div>
//                 <div id="${movieDescrId}"class="descr__text">
                
//                 </div>
//                 </a>
//             </div>`


// fetch ('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', {
//     headers: {
//         accept: 'application/json',
//         'X-API-KEY':'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
//     }
// }).then(answer => answer.json())
// .then(data => {
//     data.films.forEach(film => {
//     const movieDescrId = `descr__text${film.filmId}`;
//     movieConteiner.innerHTML += `
//     <div class="movie__item">
//         <div class="movie__item-bg">
//         <img
//             src="${film.posterUrlPreview}"
//             alt="Выживший"
//             width="283"
//             height="283"
//         />
//         </div>
//         <div class="movie__item-shadow"></div>
//         <a class="movie__item-descr link__white" target="_blank" href="https://www.kinopoisk.ru/film/522941/">
//         <div class="descr__head">${film.nameRu}</div>
//         <div id="${movieDescrId}"class="descr__text">
           
//         </div>
//         </a>
//     </div>`;
//     fetch (`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}`, {
//         headers: {
//             accept: 'application/json',
//             'X-API-KEY':'a74abe5b-98c9-4b94-ad76-7418b4c4f991'
//         }
//     }).then(answer => answer.json())
//     .then(dataFilmId => {
//         const descrElement = document.getElementById(movieDescrId);
//         descrElement.innerText = dataFilmId.description;
//         if (!dataFilmId.description) {
//             movieConteiner.removeChild(descrElement.parentNode.parentNode);
//         }
//     })
//    });
// });


    
    