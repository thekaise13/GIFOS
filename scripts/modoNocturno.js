//modo nocturno
const nocturno = document.querySelector('.nocturno')
const mode = localStorage.getItem('dark-theme')
const modo = document.querySelector('.modo')

if (mode == 'active') {
    document.body.classList.toggle('dark-theme')
    modo.innerText = "Modo Diurno"
}

nocturno.onclick = () => {
    const img = document.querySelector('.logo')
    const modo = document.querySelector('.modo')
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


