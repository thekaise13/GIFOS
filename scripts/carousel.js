const carousel = document.querySelector('.carousel_img')
const buttonRight = document.getElementById('carousel__button--next')
const buttonLeft = document.getElementById('carousel__button--prev')
width = window.outerWidth;
let gifIdArray = localStorage.getItem('giphyidsFavoritos')
if (width < 600) {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr`)
    .then((res) => res.json())
    .then((gifs) => {
      console.log(gifs);
      const data = gifs.data
      console.log(data);
      let template = ''
      for (let index = 0; index < data.length; index++) {
        template += ` <img src="${data[index].images.original.url}" alt="${data[index].title}" class="carousel__item"/> `
      }
      carousel.innerHTML = template
    })
} else {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr`)
    .then((res) => res.json())
    .then((gifs) => {
      const data = gifs.data
      let template = ''
      let templateRight = ''
      let templateLeft = ''
      for (let index = 0; index < 3; index++) {
        template += `<div>
        <div class="gif-cerrar">
            <div class="icono-cerrar"></div>
        </div>
        <div class="gif-tarjeta">
            <div class="gif-botones">
                <div class="icono-favorito" data-gifid="${data[index].id}"></div>
                <div class="icono-descargar"></div>
                <div class="icono-maximizar"></div>
            </div>
            <div class="contenedor-imagen">
                <img src="${data[index].images.original.url}"
                class="gif-img" alt="${data[index].title}">
            </div>
            <div class="gif-informacion">
                <p class="gif-user">${data[index].username}</p>
                <h5 class="gif-titulo">${data[index].title}</h5>
            </div>
        </div>
    </div>`
      }
      carousel.innerHTML = template
      let gifsFavoritos = document.querySelectorAll('.icono-favorito')
      let gifsDescargar = document.querySelectorAll('.icono-descargar')
      let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
      let gifsCerrar = document.querySelectorAll('.icono-cerrar')
      if (gifsFavoritos.length > 0) {
        loadFavorite(gifsFavoritos)
      }
      addEventListenerList(gifsFavoritos)
      addEventListenerListDownload(gifsDescargar)
      addEventListenerMax(gifsMaximizar)
      addEventListenercerrar(gifsCerrar)
      let conteo = 0
      buttonRight.onclick = () => {
        conteo += 3
        if (conteo > 47) {
          conteo = 0
        }
        templateRight = ''
        for (let index = conteo; index < (conteo + 3); index++) {
          templateRight += `<div>
          <div class="gif-cerrar">
              <div class="icono-cerrar"></div>
          </div>
          <div class="gif-tarjeta">
              <div class="gif-botones">
                  <div class="icono-favorito" data-gifid="${data[index].id}"></div>
                  <div class="icono-descargar"></div>
                  <div class="icono-maximizar"></div>
              </div>
              <div class="contenedor-imagen">
                  <img src="${data[index].images.original.url}"
                  class="gif-img" alt="${data[index].title}">
              </div>
              <div class="gif-informacion">
                  <p class="gif-user">${data[index].username}</p>
                  <h5 class="gif-titulo">${data[index].title}</h5>
              </div>
          </div>
      </div>`
        }
        carousel.innerHTML = templateRight
        let gifsFavoritos = document.querySelectorAll('.icono-favorito')
        let gifsDescargar = document.querySelectorAll('.icono-descargar')
        let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
        let gifsCerrar = document.querySelectorAll('.icono-cerrar')
        if (gifsFavoritos.length > 0) {
          loadFavorite(gifsFavoritos)
        }
        addEventListenerList(gifsFavoritos)
        addEventListenerListDownload(gifsDescargar)
        addEventListenerMax(gifsMaximizar)
        addEventListenercerrar(gifsCerrar)
      }
      buttonLeft.onclick = () => {
        conteo -= 3
        if (conteo < 0) {
          conteo = 47
        }
        templateLeft = ''
        for (let index = conteo; index < (conteo + 3); index++) {
          templateLeft += `<div>
          <div class="gif-cerrar">
              <div class="icono-cerrar"></div>
          </div>
          <div class="gif-tarjeta">
              <div class="gif-botones">
                  <div class="icono-favorito" data-gifid="${data[index].id}"></div>
                  <div class="icono-descargar"></div>
                  <div class="icono-maximizar"></div>
              </div>
              <div class="contenedor-imagen">
                  <img src="${data[index].images.original.url}"
                  class="gif-img" alt="${data[index].title}">
              </div>
              <div class="gif-informacion">
                  <p class="gif-user">${data[index].username}</p>
                  <h5 class="gif-titulo">${data[index].title}</h5>
              </div>
          </div>
      </div>`
        }
        carousel.innerHTML = templateLeft
        let gifsFavoritos = document.querySelectorAll('.icono-favorito')
        let gifsDescargar = document.querySelectorAll('.icono-descargar')
        let gifsMaximizar = document.querySelectorAll('.icono-maximizar')
        let gifsCerrar = document.querySelectorAll('.icono-cerrar')
        if (gifsFavoritos.length > 0) {
          loadFavorite(gifsFavoritos)
        }
        addEventListenerList(gifsFavoritos)
        addEventListenerListDownload(gifsDescargar)
        addEventListenerMax(gifsMaximizar)
        addEventListenercerrar(gifsCerrar)
      }

    })
}

function loadFavorite(list) {
  let gifIdArray = localStorage.getItem('giphyidsFavoritos')
  for (var i = 0, len = list.length; i < len; i++) {
    if (gifIdArray.includes(list[i].attributes[1].value)) {
      list[i].attributes[0].value = 'icono-favorito gif-favorito'
    }
  }
}

function addEventListenerList(list) {
  let gifIdArray = localStorage.getItem('giphyidsFavoritos').split(',')
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener('click', (nodo) => {
      if (!gifIdArray.includes(nodo.toElement.attributes[1].nodeValue)) {
        gifIdArray.push(nodo.toElement.attributes[1].nodeValue)
      } else {
        gifIdArray.splice(gifIdArray.indexOf(nodo.toElement.attributes[1].nodeValue), 1)
      }
      if (nodo.path[0].className === 'icono-favorito gif-favorito') {
        nodo.path[0].className = 'icono-favorito'
      } else {
        nodo.path[0].className = 'icono-favorito gif-favorito'
      }

      localStorage.setItem(`giphyidsFavoritos`, gifIdArray)
      console.log(gifIdArray);
      console.log(nodo.path[0].className);
    });
  }
}



function addEventListenerMax(list) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener('click', (nodo) => {
      nodo.path[0].parentElement.parentElement.parentElement.className = 'maximizado'
      console.log(nodo.path[0].parentElement.parentElement.parentElement);
    })
  }
}

function addEventListenercerrar(list) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener('click', (nodo) => {
      nodo.path[0].parentElement.parentElement.className = ''
      console.log(nodo);
    })
  }
}

function addEventListenerListDownload(list) {
  for (var i = 0, len = list.length; i < len; i++) {
    list[i].addEventListener('click', (nodo) => {
      downloadGif(nodo.path[2].childNodes[3].children[0].currentSrc)
    })
  }
}


const downloadGif = async (gifSrc, gifName) => { //https://dev.to/sbodi10/download-images-using-javascript-51a9
  const gif = await fetch(gifSrc)
  const gifBlob = await gif.blob()
  const gifURL = URL.createObjectURL(gifBlob)
  const link = document.createElement('a')
  link.href = gifURL
  link.download = gifName
  link.click()
}
