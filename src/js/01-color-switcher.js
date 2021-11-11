import changeColor from "./change-color";



const startChangeColorBtn = document.querySelector('[data-start]');
const stopChangeColorBtn = document.querySelector('[data-stop]');
let timerId = null;


startChangeColorBtn.addEventListener('click', () => {

    timerId = setInterval(() => {
        document.body.style.background = String(changeColor());
    }, 1000);
    
    startChangeColorBtn.setAttribute('disabled', 'disabled');

});



stopChangeColorBtn.addEventListener('click', () => {
    clearInterval(timerId);
    startChangeColorBtn.removeAttribute('disabled');
})


