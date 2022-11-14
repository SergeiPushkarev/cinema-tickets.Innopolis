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
    return getKinopoiskApiData('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1')
};
const getFilmById = (id) => {
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
};

function renderBlockFilms(posterUrl, nameRu){
    const itemWrap = document.createElement('div');
    itemWrap.classList.add('movie__item');
    const itemBg = document.createElement('div');
    itemBg.classList.add('movie__item-bg');
    const shadow = document.createElement('div');
    shadow.classList.add('movie__item-shadow');
    const itemDescr = document.createElement('a');
    itemDescr.className ='movie__item-descr link__white';
    itemWrap.append(itemBg,shadow,itemDescr);
    const imgBg = document.createElement('img');
    imgBg.alt = 'постер_фильма';
    imgBg.src = posterUrl;
    imgBg.width = '283px';
    itemBg.append(imgBg);
    const descrHead = document.createElement('div');
    const descrTxt = document.createElement('div');
    descrHead.classList.add('descr__head');
    descrHead.innerText = nameRu;
    descrTxt.classList.add('descr__text');
    descrTxt.innerText = '..loading..';
    itemDescr.append(descrHead,descrTxt);
    return [itemWrap, descrTxt]
}

const getBlockFilmsData = async () => {
    try {
        const answer = await getTopFilms();
        const data = await answer.json();
        const request = [];
        const filmsLayout = new Map();

        data.films.forEach(async (film) => {
            const [filmConteiner, description] = renderBlockFilms(film.posterUrlPreview,film.nameRu);
            filmsLayout.set(film.filmId, filmConteiner);

            request.push(new Promise(async (resolve,reject) =>{
                   try{
                        const answer = await getFilmById(film.filmId);
                        const dataFilmId = await answer.json();
                        description.textContent = dataFilmId.description;
                        if (!dataFilmId.description) {
                            filmsLayout.delete(film.filmId)
                        };
                   } catch (error) {
                   }
                        
                   resolve();
                }));
        });
        await Promise.all(request);
        const filmsLayouts = [...filmsLayout.values()].slice(0,9);
        movieConteiner.append(...filmsLayouts);
    } catch(error) {
        console.error(error)
    }
};
// getBlockFilmsData();
