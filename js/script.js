const brgBtn = document.getElementById('brgBtn');
const mobMenu = document.getElementById('mobilemenu');

//burger button toggle
function menuToggle(){
    brgBtn.classList.toggle('burgermenu__btn-open');
    mobMenu.classList.toggle('mobilemenu-open');
}
brgBtn.onclick = menuToggle;

const getKinopoiskApiData = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'a74abe5b-98c9-4b94-ad76-7418b4c4f991',
            'Content-Type': 'application/json'
        }
    });   
};
const getFilmById = (id) => {
    return getKinopoiskApiData(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${id}`)
};