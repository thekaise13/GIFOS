
const video = document.querySelector('.video-container')
const rec = document.querySelector('.rec')
const imgPeli = document.querySelector('.img-peli')
const pHidden = document.querySelector('.hidden')
const button = document.querySelector('.button-rec')
const divRec = document.querySelector('.recorder-div')
const h2 = document.querySelector('.tittle')
const p = document.querySelector('.access')
const button1 = document.querySelector('.button-1')
const button2 = document.querySelector('.button-2')
const button3 = document.querySelector('.button-3')
const conter = document.querySelector('.conter')
const buttonReplace = document.createElement('button')
buttonReplace.classList.add('button-replace', 'button-rec')
buttonReplace.innerText = 'GRABAR'
const buttonReplace2 = document.createElement('button')
buttonReplace2.classList.add('button-replace2', 'button-rec')
buttonReplace2.innerText = 'FINALIZAR'
const buttonReplace3 = document.createElement('button')
buttonReplace3.classList.add('button-replace3', 'button-rec')
buttonReplace3.innerText = 'SUBIR GIF'
let gifIds = []
gifIds.push(localStorage.getItem(`giphyids`))
console.log(gifIds);

function getStreamAndRecord() {
    let video = document.querySelector('.video-container')
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            video.srcObject = stream;
            video.play()
        })
}


button.onclick = () => {
    h2.innerHTML = '¿nos das acceso  <br> a tu camara?'
    p.innerHTML = 'El acceso a tu camara será valido solo <br> por el tiempo en el que estes creando el GIFO'
    button1.classList.toggle('button-selection')
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    }).then(function (stream) {
        button1.classList.toggle('button-selection')
        button2.classList.toggle('button-selection')
        button.replaceWith(buttonReplace)
        divRec.innerHTML = `<div>
        <div class="contenedor-L">
        <video src="" class="video-container"></video> 
        <div class="gif-informacion1">
        <img src="images/loader.svg" alt"loader">
        <h5 class="gif-tituloL">Estamos subiendo tu GIFO</h5>
        </div>
        </div>
        </div>
    `
        let contenedor = document.querySelector('.contenedor-L')
        let video = document.querySelector('.video-container')
        let gifinfo = document.querySelector('.gif-informacion1')
        console.log(gifinfo);
        video.srcObject = stream;
        video.play()
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
        });
        buttonReplace.onclick = () => {
            pHidden.classList.remove('hidden')
            imgPeli.classList.add('img-act')
            chronometerCall = setInterval(chronometer, 1000)
            recorder.startRecording();
            buttonReplace.replaceWith(buttonReplace2)
        }
        buttonReplace2.onclick = () => {
            pHidden.innerText = 'REPETIR CAPTURA'
            pHidden.classList.add('p-active')
            clearInterval(chronometerCall)
            recorder.stopRecording();
            buttonReplace2.replaceWith(buttonReplace3)
        }
        buttonReplace3.onclick = () => {
            let contenedor = document.querySelector('.contenedor-L')
            let video = document.querySelector('.video-container')
            let gifinfo = document.querySelector('.gif-informacion1')
            contenedor.classList.add('contenedor-loader')
            video.classList.add('video-loader')
            gifinfo.classList.remove('gif-informacion1')
            gifinfo.classList.add('gif-informacion-loader')
            button2.classList.toggle('button-selection')
            button3.classList.toggle('button-selection')
            let newForm = new FormData()
            newForm.append('api_key', 'vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr')
            newForm.append('file', recorder.getBlob(), 'myGif.gif')
            console.log(recorder.getBlob());
            buttonReplace3.remove()
            fetch('https://upload.giphy.com/v1/gifs', {
                method: 'POST',
                body: newForm
            }).then(response => response.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    let id = response.data.id
                    gifIds.push(id)
                    localStorage.setItem(`giphyids`, gifIds)
                    console.log(gifIds);
                    fetch(`https://api.giphy.com/v1/gifs?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&ids=${id}`)
                        .then((res) => res.json(res))
                        .then((gifs) => {
                            let gifsData = gifs.data
                            divRec.innerHTML = `
                            <div>
                            <div class="gif-cerrar">
                            <div class="icono-cerrar"></div>
                            </div>
                            <div class="gif-tarjeta">
                            <div class="gif-botones">
                            <div class="icono-favorito" data-gifid="${gifsData[0].images.original.url}"></div>
                            <a target="_blank" href="${gifsData[0].images.original.url}"><div class="icono-descargar"></div></a>
                            </div>
                            <div class="contenedor-imagen">
                            <img src="${gifsData[0].images.original.url}"
                            class="gif-img" alt="${gifsData[0].images.original.url}}">
                            </div>
                            <div class="gif-informacion">
                            <img src="images/check.svg" alt"check">
                            <h5 class="gif-titulo">GIFO subido con exito</h5>
                            </div>
                            </div>
                            </div>`

                            let buttondownload = document.querySelector('.icono-favorito')
                            buttondownload.onclick = (nodo) => {
                                downloadGif(nodo.path[2].childNodes[1].children[0].attributes[1].textContent)
                            }
                        })
                })
        }
    })
}
pHidden.onclick = () => {
    divRec.innerHTML = `<div>
    <div class="contenedor-L">
    <video src="" class="video-container"></video> 
    <div class="gif-informacion1">
    <img src="images/loader.svg" alt"loader">
    <h5 class="gif-tituloL">Estamos subiendo tu GIFO</h5>
    </div>
    </div>
    </div>
`
    let video = document.querySelector('.video-container')
    getStreamAndRecord()
    if (button2.classList.contains('button-selection') === false) {
        button2.classList.toggle('button-selection')
        button3.classList.toggle('button-selection')
    }
    if (rec.contains(buttonReplace3) === false) {
        rec.insertAdjacentElement('beforeend', buttonReplace)
    }
    recorder.reset()
    buttonReplace3.replaceWith(buttonReplace)
    buttonReplace3.remove()
    pHidden.classList.add('hidden')
    pHidden.classList.remove('p-active')
    imgPeli.classList.remove('img-act')
    pHidden.innerText = `00:00:00`
    clearInterval(chronometerCall)
    chronometerDisplay.textContent = `00:00:00`
    hours = `00`,
        minutes = `00`,
        seconds = `00`
}

let hours = `00`,
    minutes = `00`,
    seconds = `00`,
    chronometerDisplay = document.querySelector(`[data-chronometer]`),
    chronometerCall

function chronometer() {
    seconds++
    if (seconds < 10) seconds = `0` + seconds
    if (seconds > 59) {
        seconds = `00`
        minutes++
        if (minutes < 10) minutes = `0` + minutes
    }
    if (minutes > 59) {
        minutes = `00`
        hours++
        if (hours < 10) hours = `0` + hours
    }
    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
}

buttonReplace.onclick = () => {
    chronometerCall = setInterval(chronometer, 1000)
}

buttonReplace2.onclick = () => {
    clearInterval(chronometerCall)
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