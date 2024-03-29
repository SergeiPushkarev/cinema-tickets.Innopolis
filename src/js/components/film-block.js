import {getFilmById,getTopFilms} from "../__data__/kinopoisk.js"

function renderBlockFilms(posterUrl, nameRu, id){
    const link = document.createElement('a');
    link.href = `/single/?id=${id}`
    const itemWrap = document.createElement('div');
    itemWrap.classList.add('movie');
    const itemBg = document.createElement('div');
    itemBg.classList.add('movie__bg');
    const shadow = document.createElement('div');
    shadow.classList.add('movie__shadow');
    const itemDescr = document.createElement('div');
    itemDescr.className ='movie__descr link__white';
    const imgBg = document.createElement('img');
    imgBg.alt = 'постер_фильма';
    imgBg.src = posterUrl;
    imgBg.width = '283px';
    itemBg.append(imgBg);
    const descrHead = document.createElement('div');
    const descrTxt = document.createElement('div');
    descrHead.classList.add('movie__descr-head');
    descrHead.innerText = nameRu;
    descrTxt.classList.add('movie__descr-text');
    descrTxt.innerText = '..loading..';
    itemDescr.append(descrHead,descrTxt);
    itemWrap.append(link);
    link.append(itemBg,shadow,itemDescr);
    return [itemWrap, descrTxt]
}

const getBlockFilmsData = async (movieConteiner) => {
    try {
        const answer = await getTopFilms();
        const data = await answer.json();
        const request = [];
        const filmsLayout = new Map();

        data.films.forEach(async (film, i) => {
            const [filmConteiner, description] = renderBlockFilms(film.posterUrlPreview, film.nameRu, film.filmId);
            filmsLayout.set(film.filmId, filmConteiner);

            request.push(new Promise(async (resolve,reject) =>{
                   setTimeout(async()=>{
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
                   }, i * 100)
                }));
        });
        await Promise.all(request);
        movieConteiner.innerHTML = "";
        const filmsLayouts = [...filmsLayout.values()].slice(0,9);
        movieConteiner.append(...filmsLayouts);
    } catch(error) {
        console.error(error)
    }
};

export {getBlockFilmsData}