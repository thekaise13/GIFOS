//modo nocturno
const nocturno = document.querySelector('.nocturno')
const mode = localStorage.getItem('dark-theme')
const modo = document.querySelector('.modo')
const img = document.querySelector('.logo')

if (mode == 'active') {
    document.body.classList.toggle('dark-theme')
    modo.innerText = "Modo Diurno"
    img.src = "images/Logo-modo-noc.svg"
}

nocturno.onclick = () => {
    document.body.classList.toggle('dark-theme')
    if (document.body.classList.contains('dark-theme')) {
        modo.innerText = "Modo Diurno"
        img.src = "images/Logo-modo-noc.svg"
        localStorage.setItem('dark-theme', 'active')
    } else {
        img.src = "images/logo-mobile.svg"
        modo.innerText = "Modo Nocturno"
        localStorage.setItem('dark-theme', 'deactive')
    }
}


