const brgBtn = document.getElementById('brgBtn');
const mobMenu = document.getElementById('mobilemenu');
function menuToggle(){
    brgBtn.classList.toggle('burgermenu__btn-open');
    mobMenu.classList.toggle('mobilemenu-open');
}
brgBtn.onclick = menuToggle;

document.addEventListener('click', e=>{
    if (!e.composedPath().includes(document.querySelector('.head__nav'))) {
        brgBtn.classList.remove('burgermenu__btn-open');
        mobMenu.classList.remove('mobilemenu-open');
    }
})