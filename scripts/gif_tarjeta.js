// const API_KEYA = 'AtFhxuS2ViotCp9n7plJmeINROHg86Yl'
// const API_URLA = 'http://api.giphy.com/v1/gifs'
// const API_TRENDING_URLA = 'http://api.giphy.com/v1/gifs/trending'
let gifsOnLS = []

// fetch(`${API_TRENDING_URLA}?api_key=${API_KEYA}`)
//     .then(res => res.json())
// .then(res => {
// console.log(res)
let gifsFavoritos = document.querySelectorAll('.icono-favorito')
let gifsDescargar = document.querySelectorAll('.icono-descargar')
let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
let gifsCerrar = document.querySelectorAll('.icono-cerrar')
console.log(gifsFavoritos);

gifsOnLS = localStorage.getItem('Gifs Favoritos')
if (gifsOnLS === null) {
    gifsOnLS = "[]"
    gifsOnLS = formatArray(gifsOnLS)
    gifsOnLS.splice(0, 1)
} else {
    gifsOnLS = formatArray(gifsOnLS)
}

for (let i = 0; i < gifsFavoritos.length; i++) {

    let dataGifId = gifsFavoritos[i].getAttribute('data-gifid')

    if (gifsOnLS.includes(dataGifId)) {
        gifsFavoritos[i].classList.add('gif-favorito')
    }

    gifsFavoritos[i].addEventListener('click', () => {
        let dataGifId = gifsFavoritos[i].getAttribute('data-gifid')

        if (gifsFavoritos[i].classList.contains('gif-favorito')) {

            gifsFavoritos[i].classList.remove('gif-favorito')
            gifsOnLS.splice(gifsOnLS.indexOf(dataGifId), 1)

        } else {

            gifsFavoritos[i].classList.add('gif-favorito')
            gifsOnLS.push(dataGifId)

        }

        localStorage.setItem('Gifs Favoritos', JSON.stringify(gifsOnLS))
    })

    gifsDescargar[i].addEventListener('click', () => {
        downloadGif(res.data[i].images.downsized.url, res.data[i].title)
    })

    gifsMaximizar[i].addEventListener('click', () => {
        let iconoMaximizar = gifsCerrar[i]
        console.log(iconoMaximizar.parentElement.parentElement.classList.add('maximizado'))
    })

    gifsCerrar[i].addEventListener('click', () => {
        let iconoCerrar = gifsCerrar[i]
        console.log(iconoCerrar.parentElement.parentElement.classList.remove('maximizado'))
    })

}

// }).catch(error => console.error(error))

// const formatArray = (arrayName) => {
//     if (arrayName !== null) {
//         arrayName = arrayName.replace('[', '');
//         arrayName = arrayName.replace(']', '');
//         arrayName = arrayName.replaceAll('"', '');
//         arrayName = arrayName.split(',')
//     }

//     return arrayName
// }

const downloadGif = async (gifSrc, gifName) => { //https://dev.to/sbodi10/download-images-using-javascript-51a9
    const gif = await fetch(gifSrc)
    const gifBlob = await gif.blob()
    const gifURL = URL.createObjectURL(gifBlob)

    const link = document.createElement('a')
    link.href = gifURL
    link.download = gifName
    link.click()
}


/*
<div class="gif-tarjeta">
    <div class="gif-botones">
        <div class="icono-favorito gif-favorito"></div>
        <div class="icono-descargar"></div>
        <div class="icono-maximizar"></div>
    </div>
    <div class="contenedor-imagen">
        <img src="https://media1.tenor.com/images/c7e549786b748474c08a5ab64f90ea08/tenor.gif?itemid=18132843"
        class="gif-img" alt="gato prueba">
    </div>
    <div class="gif-informacion">
        <p class="gif-user">User</p>
        <h5 class="gif-titulo">Título GIFO</h5>
    </div>
</div>
*/