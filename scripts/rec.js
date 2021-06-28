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
        divRec.innerHTML = `<video src="" class="video-container"></video>`
        let video = document.querySelector('.video-container')
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
                    localStorage.setItem(`giphy${id}`, id)
                    console.log(response);
                })
        }
        pHidden.onclick = () => {
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
    })
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


