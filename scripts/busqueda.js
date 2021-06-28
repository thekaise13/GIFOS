// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let divGif = document.querySelector('.imagenes')
const verMas = document.querySelector('.ver-mas')
const hr = document.querySelector('.hidden-hr')
console.log(hr);


// if user press any key and release
inputBox.onkeyup = (e) => {
    let userData = e.target.value;
    fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}`)
        .then((res) => res.json(res))
        .then((gifs) => {
            console.log(gifs);
            let suggestions = []
            let datagif = gifs.data
            console.log(datagif[0]);
            for (let index = 0; index < datagif.length; index++) {
                suggestions.push(datagif[index].name)
            }
            console.log(suggestions)
            let userData = e.target.value; //user enetered data
            let emptyArray = [];
            if (userData) {
                emptyArray = suggestions.filter((data) => {
                    //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                    return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
                });
                emptyArray = emptyArray.map((data) => {
                    // passing return data inside li tag
                    return data = '<li><i class="fas fa-search"></i>' + data + '</li>';
                });
                hr.classList.add("active")
                searchWrapper.classList.add("active");
                icon.innerHTML = '<i class="fa fa-times"></i>' //show autocomplete box
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    allList[i].setAttribute("onclick", "select(this)");
                }
                icon.firstChild.setAttribute("onclick", "select(this)")

            } else {

                searchWrapper.classList.remove("active");
                icon.innerHTML = '<i class="fas fa-search"></i>' //hide autocomplete box
            }
            if (e.keyCode === 13) {
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}`)
                    .then((res) => res.json(res))
                    .then((gif) => {
                        let template = ''
                        let urlsgif = gif.data
                        let conteo = 0
                        console.log(gif);
                        for (let index = 0; index < 12; index++) {
                            template += `<img src="${urlsgif[index].images.original.url}" alt="${urlsgif[index].title}">`
                            conteo = index
                        }
                        divGif.innerHTML = template + `<button class="ver-mas">ver mas</button>`
                        const verMas = document.querySelector('.ver-mas')
                        conteo += 1
                        console.log(conteo);
                        verMas.onclick = () => {
                            fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}&offset=${conteo}&limit=12`)
                                .then((res) => res.json(res))
                                .then((gif) => {
                                    let urlsgif1 = gif.data
                                    console.log(gif);
                                    let template1 = ''
                                    for (let index = 0; index < 12; index++) {
                                        template1 += `<img src="${urlsgif1[index].images.original.url}" alt="${urlsgif1[index].title}">`
                                    }
                                    verMas.insertAdjacentHTML('beforebegin', template1)
                                })
                            conteo += 12
                            console.log(conteo);

                        }
                    }).catch((err) => { divGif.innerHTML = '<p> error </p>' })
                searchWrapper.classList.remove("active");
                icon.innerHTML = '<i class="fas fa-search"></i>'



            }
        }).catch((err) => { divGif.innerHTML = '<p> error </p>' })
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    let times = document.querySelector('.fa fa-times')
    icon.onclick = () => {
        if (icon.contains(times)) { console.log('times'); }
        // let userData = e.target.value;
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}`)
            .then((res) => res.json(res))
            .then((gif) => {
                let template = ''
                let urlsgif = gif.data
                let conteo = 0
                console.log(gif);
                for (let index = 0; index < 12; index++) {
                    template += `<img src="${urlsgif[index].images.original.url}" alt="${urlsgif[index].title}">`
                    conteo = index
                }
                divGif.innerHTML = template + `<button class="ver-mas">ver mas</button>`
                const verMas = document.querySelector('.ver-mas')
                conteo += 1
                console.log(conteo);
                verMas.onclick = () => {
                    fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}&offset=${conteo}&limit=12`)
                        .then((res) => res.json(res))
                        .then((gif) => {
                            let urlsgif1 = gif.data
                            console.log(gif);
                            let template1 = ''
                            for (let index = 0; index < 12; index++) {
                                template1 += `<img src="${urlsgif1[index].images.original.url}" alt="${urlsgif1[index].title}">`
                            }
                            verMas.insertAdjacentHTML('beforebegin', template1)
                        })
                    conteo += 12
                    console.log(conteo);

                }
            })
    }
    searchWrapper.classList.remove("active");
    icon.innerHTML = '<i class="fas fa-search"></i>'
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        userValue = inputBox.value;
        listData = '<li>' + userValue + '</li>';
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}
