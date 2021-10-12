document.querySelector('.button').addEventListener('click', changeSvg);

function changeSvg() {
    const svg = document.querySelector('.bi');
    svg.classList.toggle('dark');
}