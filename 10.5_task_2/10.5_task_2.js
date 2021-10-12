document.querySelector('.button').addEventListener('click' ,alertWindowSize);

function alertWindowSize () {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;
    const monitorHeight = window.screen.height;
    const monitorWidth = window.screen.width;
    const documentHeight = document.documentElement.clientHeight;
    const documentWidth = document.documentElement.clientWidth;
    alert(`    Внутренние размеры экрана:  высота - ${innerHeight}px, ширина - ${innerWidth}px
    Разрешение монитора:            высота - ${monitorHeight}px, ширина - ${monitorWidth}px
    Размер "документа":                высота - ${documentHeight}px, ширина - ${documentWidth}px`);

}