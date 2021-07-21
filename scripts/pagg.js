const pageNumbers = (total, max, current) => {
    const half = Math.floor(max / 2);
    let to = max;

    if (current + half >= total) {
        to = total;
    } else if (current > half) {
        to = current + half;
    }

    let from = to - max;

    return Array.from({ length: max }, (_, i) => (i + 1) + from);
}

function PaginationButton(totalPages, maxPagesVisible = 10, currentPage = 1) {
    let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    let currentPageBtn = null;
    const buttons = new Map();
    const disabled = {
        start: () => pages[0] === 1,
        prev: () => currentPage === 1,
        end: () => pages.slice(-1)[0] === totalPages,
        next: () => currentPage === totalPages
    }
    const frag = document.createDocumentFragment();
    const paginationButtonContainer = document.createElement('div');
    paginationButtonContainer.className = 'pagination-buttons';

    const createAndSetupButton = (label = '', cls = '', disabled = false, handleClick) => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = label;
        buttonElement.className = `page-btn ${cls}`;
        buttonElement.disabled = disabled;
        buttonElement.addEventListener('click', e => {
            handleClick(e);
            this.update();
            paginationButtonContainer.value = currentPage;
            paginationButtonContainer.dispatchEvent(new Event('change'));
        });

        return buttonElement;
    }
    const createAndSetupButtonStar = (label = '', cls = '', disabled = false, handleClick, html) => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = label;
        buttonElement.className = `page-btn ${cls}`;
        buttonElement.disabled = disabled;
        buttonElement.innerHTML = html
        buttonElement.addEventListener('click', e => {
            handleClick(e);
            this.update();
            paginationButtonContainer.value = currentPage;
            paginationButtonContainer.dispatchEvent(new Event('change'));
        });

        return buttonElement;
    }

    const onPageButtonClick = e => currentPage = Number(e.currentTarget.textContent);

    const onPageButtonUpdate = index => (btn) => {
        btn.textContent = pages[index];

        if (pages[index] === currentPage) {
            currentPageBtn.classList.remove('active');
            btn.classList.add('active');
            currentPageBtn = btn;
            currentPageBtn.focus();
        }
    };

    buttons.set(
        createAndSetupButton('start', 'start-page', disabled.start(), () => currentPage = 1),
        (btn) => btn.disabled = disabled.start()
    )

    buttons.set(
        createAndSetupButtonStar('prev', 'prev-page', disabled.prev(), () => currentPage -= 1, `<i class="fas fa-chevron-left"></i>`),
        (btn) => btn.disabled = disabled.prev()
    )

    pages.map((pageNumber, index) => {
        const isCurrentPage = currentPage === pageNumber;
        const button = createAndSetupButton(
            pageNumber, isCurrentPage ? 'active' : '', false, onPageButtonClick
        );

        if (isCurrentPage) {
            currentPageBtn = button;
        }

        buttons.set(button, onPageButtonUpdate(index));
    });

    buttons.set(
        createAndSetupButtonStar('next', 'next-page', disabled.next(), () => currentPage += 1, `<i class="fas fa-chevron-right"></i>`),
        (btn) => btn.disabled = disabled.next()
    )

    buttons.set(
        createAndSetupButton('end', 'end-page', disabled.end(), () => currentPage = totalPages),
        (btn) => btn.disabled = disabled.end()
    )

    buttons.forEach((_, btn) => frag.appendChild(btn));
    paginationButtonContainer.appendChild(frag);

    this.render = (container = document.body) => {
        container.appendChild(paginationButtonContainer);
    }

    this.update = (newPageNumber = currentPage) => {
        currentPage = newPageNumber;
        pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
        buttons.forEach((updateButton, btn) => updateButton(btn));
    }

    this.onChange = (handler) => {
        paginationButtonContainer.addEventListener('change', handler);
    }
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

function innerTemplate(array) {
    let template1 = ''
    if (width < 600) {
        for (let index = 0; index < 12; index++) {
            template1 += `<img src="${array[index].images.original.url}" alt="${array[index].title}">`
        }
        divGif.innerHTML = template1
    } else {
        for (let index = 0; index < 12; index++) {
            template1 += `<div>
            <div class="gif-cerrar">
                <div class="icono-cerrar"></div>
            </div>
            <div class="gif-tarjeta">
                <div class="gif-botones">
                    <div class="icono-favorito" data-gifid="${array[index].id}"></div>
                    <div class="icono-descargar"></div>
                    <div class="icono-maximizar"></div>
                </div>
                <div class="contenedor-imagen">
                    <img src="${array[index].images.original.url}"
                    class="gif-img" alt="${array[index].title}">
                </div>
                <div class="gif-informacion">
                    <p class="gif-user">${array[index].username}</p>
                    <h5 class="gif-titulo">${array[index].title}</h5>
                </div>
            </div>
        </div>`
        }
        divGif.innerHTML = template1
    }
}
function innerError(data) {
    divGif.innerHTML = `<p class="p-user-error">${data}</p> <img src="images/icon-busqueda-sin-resultado.svg" alt="sin-resultados" class="sin-resultados"> <p class="sin-resultados-p">intenta con otra busqueda</p>`
    reactions.classList.add("hidden")
    trendingBusqueda.classList.remove("hidden")
    divGif.classList.remove("imagenes-normal")
    divGif.classList.add("imagenes-error")
    pagg.classList.add("hidden")
}




// getting all required elements
let width = window.outerWidth;
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let divGif = document.getElementById("imagenes")
const verMas = document.querySelector('.ver-mas')
const pagg = document.querySelector('.pagg')
const hr = document.querySelector('.hidden-hr')
const reactions = document.querySelector('.reactions')
const trendingBusqueda = document.querySelector('.trending-busqueda')
width = window.outerWidth;
const li = document.querySelector('.li-sugg')


function addEventListenerList(list) {
    let gifIdArray = []
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
                    return data = '<li class="li-sugg"><i class="fas fa-search"></i>' + data + '</li>';
                });
                searchWrapper.classList.add("active");
                icon.innerHTML = '<i class="fa fa-times"></i>' //show autocomplete box
                hr.classList.add("active")
                showSuggestions(emptyArray);
                let allList = suggBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    allList[i].setAttribute("onclick", "select(this)");
                }
                icon.firstChild.setAttribute("onclick", "select(this)")
            } else {
                hr.classList.remove("active");
                searchWrapper.classList.remove("active");
                icon.innerHTML = '<i class="fas fa-search"></i>' //hide autocomplete box
            }
            if (e.keyCode === 13) {
                fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}`)
                    .then((res) => res.json(res))
                    .then((gif) => {
                        let urlsgif = gif.data
                        console.log(urlsgif);
                        totalPages = Math.floor(gif.pagination.total_count / 12)
                        innerTemplate(urlsgif)
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
                        let pagination = document.querySelector('.pagination-buttons')
                        if (pagg.contains(pagination)) {
                            pagg.removeChild(pagination)
                        }
                        if (totalPages >= 416) {
                            totalPages = 416
                        } else {
                            totalPages = totalPages
                        }
                        const paginationButtons = new PaginationButton(totalPages, 5);
                        if (!divGif.classList.contains("imagenes-normal")) {
                            divGif.classList.add("imagenes-normal")
                            divGif.classList.remove("imagenes-error")
                            pagg.classList.remove("hidden")
                            reactions.classList.remove("hidden")
                        }
                        paginationButtons.render(pagg)
                        reactions.innerHTML = ` <hr class="hr-data"> <p class="p-data">${userData}</p>`
                        paginationButtons.onChange(e => {
                            let numButton = e.target.value
                            numButton = (numButton * 12) - 12
                            console.log('-- changed', numButton)
                            fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}&offset=${numButton}&limit=12`)
                                .then((res) => res.json(res))
                                .then((gif) => {
                                    let urlsgif1 = gif.data
                                    innerTemplate(urlsgif1)
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
                                })
                        });
                    }).catch((err) => { innerError(userData) })
                searchWrapper.classList.remove("active");
                hr.classList.remove("active");
                icon.innerHTML = '<i class="fas fa-search"></i>'
                if (width > 600) {
                    trendingBusqueda.classList.add("hidden")
                }

            }
        }).catch((err) => { innerError(userData) })
}

function select(element) {
    let selectData = element.textContent;
    let times = document.querySelector('.fa fa-times')
    inputBox.value = selectData;
    icon.onclick = () => {
        inputBox.value = selectData;
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}`)
            .then((res) => res.json(res))
            .then((gif) => {
                let urlsgif = gif.data
                innerTemplate(urlsgif)
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
                totalPages = Math.floor(gif.pagination.total_count / 12)
                console.log(gif);
                if (!divGif.classList.contains("imagenes-normal")) {
                    divGif.classList.add("imagenes-normal")
                    divGif.classList.remove("imagenes-error")
                    pagg.classList.remove("hidden")
                    reactions.classList.remove("hidden")
                }
                reactions.innerHTML = ` <hr class="hr-data"><p class="p-data">${selectData}</p>`
                let pagination = document.querySelector('.pagination-buttons')
                if (pagg.contains(pagination)) {
                    pagg.removeChild(pagination)
                }
                if (totalPages >= 416) {
                    totalPages = 416
                } else {
                    totalPages = totalPages
                }
                console.log(totalPages);
                const paginationButtons = new PaginationButton(totalPages, 5);
                paginationButtons.render(pagg)
                paginationButtons.onChange(e => {
                    let numButton = e.target.value
                    numButton = (numButton * 12) - 12
                    console.log('-- changed', numButton)
                    fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}&offset=${numButton}&limit=12`)
                        .then((res) => res.json(res))
                        .then((gif) => {
                            let urlsgif1 = gif.data
                            innerTemplate(urlsgif1)
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
                        }).catch((err) => { innerError(selectData) })
                });
            }).catch((err) => { innerError(selectData) })
    }
    searchWrapper.classList.remove("active");
    hr.classList.remove("active");
    icon.innerHTML = '<i class="fas fa-search"></i>'
}