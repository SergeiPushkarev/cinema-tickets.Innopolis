const getKinopoiskApiData = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991',
            'Content-Type': 'application/json'
        }
    })
}
export const getFilmById = (id) => {
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
}
export const getTopFilms = () => {
    return getKinopoiskApiData('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1')
}
export const getFilmInfo = (id) =>{
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${id}`)
}
export const getGenreList = () => {
    return getKinopoiskApiData('https://kinopoiskapiunofficial.tech/api/v2.2/films/filters')
}
export const getSimilarGenres = (id) =>{
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v2.2/films?genres=${id}`)
}