const carousel = document.querySelector('.carousel_img')
const buttonRight = document.getElementById('carousel__button--next')
const buttonLeft = document.getElementById('carousel__button--prev')
let width = window.outerWidth;
console.log(width);
if (width < 600) {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr`)
    .then((res) => res.json())
    .then((gifs) => {
      const data = gifs.data
      let template = ''
      for (let index = 0; index < data.length; index++) {
        template += ` <img src="${data[index].images.original.url}" class="carousel__item"/>`
      }
      carousel.innerHTML = template

    })
}

if (width > 600) {
  fetch(`https://api.giphy.com/v1/gifs/trending?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr`)
    .then((res) => res.json())
    .then((gifs) => {
      const data = gifs.data
      let template = ''
      let templateRight = ''
      let templateLeft = ''
      for (let index = 0; index < 3; index++) {
        template += ` <img src="${data[index].images.original.url}" class="carousel__item"/>`
      }
      carousel.innerHTML = template
      let conteo = 0
      buttonRight.onclick = () => {
        conteo += 3
        if (conteo > 47) {
          conteo = 0
        }
        templateRight = ''
        for (let index = conteo; index < (conteo + 3); index++) {
          templateRight += ` <img src="${data[index].images.original.url}" class="carousel__item"/>`
        }
        carousel.innerHTML = templateRight
      }
      buttonLeft.onclick = () => {
        conteo -= 3
        if (conteo < 0) {
          conteo = 47
        }
        templateLeft = ''
        for (let index = conteo; index < (conteo + 3); index++) {
          templateLeft += ` <img src="${data[index].images.original.url}" class="carousel__item"/>`
        }
        carousel.innerHTML = templateLeft
      }
    })
}
