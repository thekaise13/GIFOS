const nocturno = document.querySelector('.nocturno')
const camara = document.querySelector('.img-camara')
const peli = document.querySelector('.img-peli')
const mode = localStorage.getItem('dark-theme')

if (mode == 'active') {
    document.body.classList.toggle('dark-theme')
}

nocturno.onclick = () => {
    const img = document.querySelector('.logo')
    const crear = document.querySelector('.crearimg')
    const modo = document.querySelector('.modo')
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        modo.innerText = "Modo Diurno"
        img.src = "images/Logo-modo-noc.svg"
        peli.src = "images/pelicula-modo-noc.svg"
        camara.src = "images/camara-modo-noc.svg"
    } else {
        modo.innerText = "Modo Nocturno"
        camara.src = "images/camara.svg"
        img.src = "images/logo-mobile.svg"
        peli.src = "images/pelicula.svg"
    }
}