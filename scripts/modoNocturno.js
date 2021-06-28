//modo nocturno
const nocturno = document.querySelector('.nocturno')

nocturno.onclick = () => {
    const img = document.querySelector('.logo')
    const crear = document.querySelector('.crearimg')
    const modo = document.querySelector('.modo')
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        modo.innerText = "Modo Diurno"
        img.src = "images/Logo-modo-noc.svg"
        crear.src = "images/CTA-crar-gifo-modo-noc.svg"
    } else {
        img.src = "images/logo-mobile.svg"
        modo.innerText = "Modo Nocturno"
        crear.src = "images/button-crear-gifo.svg"
    }
}


