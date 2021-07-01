const divGif = document.getElementById('imagenes')
const divButton = document.querySelector('.div-button')
arrayIDs = []
stringIDs = ''
for (let i = 0, len = localStorage.length; i < len; ++i) {
    arrayIDs.push(localStorage.getItem(localStorage.key(i)))
    stringIDs = arrayIDs.join()
}

fetch(`https://api.giphy.com/v1/gifs?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&ids=${stringIDs}`)
    .then((res) => res.json(res))
    .then((gifs) => {
        let gifdata = gifs.data
        let template1 = ''
        if (gifdata.length < 12) {
            for (let index = 0; index < gifdata.length; index++) {
                template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
            }
        } else {
            for (let index = 0; index < 12; index++) {
                template1 += `<img src="${gifdata[index].images.original.url}" alt="${gifdata[index].title}">`
            }
        }
        divGif.innerHTML = template1
        let conteo = 12
        divButton.innerHTML = `<button class="button-ver-mas">VER MAS</button>`
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
    })