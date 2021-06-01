

const nocturno = document.querySelector('.nocturno')

nocturno.onclick = () => {
    const img = document.querySelector('.logo')
    const crear = document.querySelector('.crearimg')
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        img.src = "images/Logo-modo-noc.svg"
        crear.src = "images/CTA-crar-gifo-modo-noc.svg"
    } else {
        img.src = "images/logo-mobile.svg"
        crear.src = "images/button-crear-gifo.svg"
    }
}
