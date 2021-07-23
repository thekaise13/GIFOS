const divGif = document.getElementById('imagenes')
const divButton = document.querySelector('.div-button')
let stringIDs = localStorage.getItem('giphyidsFavoritos')
const divSinGif = document.getElementById('no-content')

fetch(`https://api.giphy.com/v1/gifs?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&ids=${stringIDs}`)
    .then((res) => res.json(res))
    .then((gifs) => {
        let gifdata = gifs.data
        let template1 = ''
        if (gifdata.length === 0) {
            divSinGif.classList.remove('hidden')
        }
        if (width < 900) {
            if (gifdata.length < 12) {
                for (let index = 0; index < gifdata.length; index++) {
                    template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
                }
            } else {
                for (let index = 0; index < 12; index++) {
                    template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
                }
                divButton.innerHTML = `<button class="button-ver-mas">VER MAS</button>`
            }
            divGif.innerHTML = template1
            let conteo = 12
            const Button = document.querySelector('.button-ver-mas')
            Button.onclick = () => {
                if (conteo >= (gifdata.length - 12)) {
                    for (let index = conteo; index < gifdata.length; index++) {
                        template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
                    }
                    Button.remove()
                    divGif.innerHTML = template1
                } else {
                    for (let index = conteo; index < (conteo + 12); index++) {
                        template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
                    }
                    divGif.innerHTML = template1
                    conteo += 12
                }

            }
        } else {
            if (gifdata.length <= 12) {
                for (let index = 0; index < gifdata.length; index++) {
                    template1 += `<div>
            <div class="gif-cerrar">
                <div class="icono-cerrar"></div>
            </div>
            <div class="gif-tarjeta">
                <div class="gif-botones">
                    <div class="icono-favorito gif-favorito" datagifid="${gifdata[index].id}"></div>
                    <div class="icono-descargar"></div>
                    <div class="icono-maximizar"></div>
                </div>
                <div class="contenedor-imagen">
                    <img src="${gifdata[index].images.original.url}"
                    class="gif-img" alt="${gifdata[index].title}">
                </div>
                <div class="gif-informacion">
                    <p class="gif-user">${gifdata[index].username}</p>
                    <h5 class="gif-titulo">${gifdata[index].title}</h5>
                </div>
            </div>
        </div>`
                }
            } else {
                for (let index = 0; index < 12; index++) {
                    template1 += `<div>
            <div class="gif-cerrar">
                <div class="icono-cerrar"></div>
            </div>
            <div class="gif-tarjeta">
                <div class="gif-botones">
                    <div class="icono-favorito gif-favorito" datagifid="${gifdata[index].id}"></div>
                    <div class="icono-descargar"></div>
                    <div class="icono-maximizar"></div>
                </div>
                <div class="contenedor-imagen">
                    <img src="${gifdata[index].images.original.url}"
                    class="gif-img" alt="${gifdata[index].title}">
                </div>
                <div class="gif-informacion">
                    <p class="gif-user">${gifdata[index].username}</p>
                    <h5 class="gif-titulo">${gifdata[index].title}</h5>
                </div>
            </div>
        </div>`
                }
                divButton.innerHTML = `<button class="button-ver-mas">VER MAS</button>`
            }
            divGif.innerHTML = template1
            let conteo = 12
            let gifsFavoritos = document.querySelectorAll('.icono-favorito')
            let gifsDescargar = document.querySelectorAll('.icono-descargar')
            let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
            let gifsCerrar = document.querySelectorAll('.icono-cerrar')
            addEventListenereliminarFav(gifsFavoritos)
            addEventListenerListDownload(gifsDescargar)
            addEventListenerMax(gifsMaximizar)
            addEventListenercerrar(gifsCerrar)
            const Button = document.querySelector('.button-ver-mas')
            Button.onclick = () => {
                if (conteo >= (gifdata.length - 12)) {
                    for (let index = conteo; index < gifdata.length; index++) {
                        template1 += `<div>
                <div class="gif-cerrar">
                    <div class="icono-cerrar"></div>
                </div>
                <div class="gif-tarjeta">
                    <div class="gif-botones">
                        <div class="icono-favorito gif-favorito" datagifid="${gifdata[index].id}"></div>
                        <div class="icono-descargar"></div>
                        <div class="icono-maximizar"></div>
                    </div>
                    <div class="contenedor-imagen">
                        <img src="${gifdata[index].images.original.url}"
                        class="gif-img" alt="${gifdata[index].title}">
                    </div>
                    <div class="gif-informacion">
                        <p class="gif-user">${gifdata[index].username}</p>
                        <h5 class="gif-titulo">${gifdata[index].title}</h5>
                    </div>
                </div>
            </div>`
                    }
                    Button.remove()
                    divGif.innerHTML = template1
                    let gifsFavoritos = document.querySelectorAll('.icono-favorito')
                    let gifsDescargar = document.querySelectorAll('.icono-descargar')
                    let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
                    let gifsCerrar = document.querySelectorAll('.icono-cerrar')
                    addEventListenereliminarFav(gifsFavoritos)
                    addEventListenerListDownload(gifsDescargar)
                    addEventListenerMax(gifsMaximizar)
                    addEventListenercerrar(gifsCerrar)
                } else {
                    for (let index = conteo; index < (conteo + 12); index++) {
                        template1 += `<div>
                <div class="gif-cerrar">
                    <div class="icono-cerrar"></div>
                </div>
                <div class="gif-tarjeta">
                    <div class="gif-botones">
                        <div class="icono-favorito gif-favorito" datagifid="${gifdata[index].id}"></div>
                        <div class="icono-descargar"></div>
                        <div class="icono-maximizar"></div>
                    </div>
                    <div class="contenedor-imagen">
                        <img src="${gifdata[index].images.original.url}"
                        class="gif-img" alt="${gifdata[index].title}">
                    </div>
                    <div class="gif-informacion">
                        <p class="gif-user">${gifdata[index].username}</p>
                        <h5 class="gif-titulo">${gifdata[index].title}</h5>
                    </div>
                </div>
            </div>`
                    }
                    divGif.innerHTML = template1
                    conteo += 12
                    let gifsFavoritos = document.querySelectorAll('.icono-favorito')
                    let gifsDescargar = document.querySelectorAll('.icono-descargar')
                    let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
                    let gifsCerrar = document.querySelectorAll('.icono-cerrar')
                    addEventListenereliminarFav(gifsFavoritos)
                    addEventListenerListDownload(gifsDescargar)
                    addEventListenerMax(gifsMaximizar)
                    addEventListenercerrar(gifsCerrar)
                }

            }
        }

    }).catch((err) => Error)

function addEventListenereliminarFav(list) {

    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener('click', (nodo) => {
            nodo.path[0].parentElement.parentElement.parentElement.remove()
            stringIDs = stringIDs.replace(`,${nodo.toElement.attributes[1].nodeValue}`, '')
            localStorage.setItem(`giphyidsFavoritos`, stringIDs)
        });
    }
}