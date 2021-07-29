const nocturno = document.querySelector('.nocturno')
const camara = document.querySelector('.img-camara')
const peli = document.querySelector('.img-peli')
const mode = localStorage.getItem('dark-theme')
const img = document.querySelector('.logo')
const modo = document.querySelector('.modo')

if (mode == 'active') {
    document.body.classList.toggle('dark-theme')
    img.src = "images/Logo-modo-noc.svg"
    peli.src = "images/pelicula-modo-noc.svg"
    camara.src = "images/camara-modo-noc.svg"
    modo.innerText = "Modo Diurno"
}

nocturno.onclick = () => {
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        modo.innerText = "Modo Diurno"
        img.src = "images/Logo-modo-noc.svg"
        peli.src = "images/pelicula-modo-noc.svg"
        camara.src = "images/camara-modo-noc.svg"
        localStorage.setItem('dark-theme', 'active')
    } else {
        modo.innerText = "Modo Nocturno"
        camara.src = "images/camara.svg"
        img.src = "images/logo-mobile.svg"
        peli.src = "images/pelicula.svg"
        localStorage.setItem('dark-theme', 'deactive')
    }
}