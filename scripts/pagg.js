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

// const paginationButtons = new PaginationButton(20, 5);

// paginationButtons.render();



// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let divGif = document.querySelector('.imagenes')
const verMas = document.querySelector('.ver-mas')
const pagg = document.querySelector('.pagg')
const hr = document.querySelector('.hidden-hr')


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
                        let template = ''
                        let urlsgif = gif.data
                        totalPages = Math.floor(gif.pagination.total_count / 12)
                        let conteo = 0
                        console.log(gif);
                        for (let index = 0; index < 12; index++) {
                            template += `<img src="${urlsgif[index].images.original.url}" alt="${urlsgif[index].title}">`
                            conteo = index
                        }
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
                        divGif.innerHTML = template
                        conteo += 1
                        console.log(conteo);
                        paginationButtons.onChange(e => {
                            let numButton = e.target.value
                            numButton = (numButton * 12) - 12
                            console.log('-- changed', numButton)
                            fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${userData}&offset=${numButton}&limit=12`)
                                .then((res) => res.json(res))
                                .then((gif) => {
                                    let urlsgif1 = gif.data
                                    console.log(gif);
                                    let template1 = ''
                                    for (let index = 0; index < 12; index++) {
                                        template1 += `<img src="${urlsgif1[index].images.original.url}" alt="${urlsgif1[index].title}">`
                                    }
                                    divGif.innerHTML = template1
                                })
                        });
                    }).catch((err) => { divGif.innerHTML = '<p> error </p>' })
                searchWrapper.classList.remove("active");
                hr.classList.remove("active");
                icon.innerHTML = '<i class="fas fa-search"></i>'



            }
        }).catch((err) => { divGif.innerHTML = '<p> error </p>' })
}

function select(element) {
    let selectData = element.textContent;
    inputBox.value = selectData;
    let times = document.querySelector('.fa fa-times')
    icon.onclick = () => {
        // let userData = e.target.value;
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}`)
            .then((res) => res.json(res))
            .then((gif) => {
                let template = ''
                let urlsgif = gif.data
                let conteo = 0
                totalPages = Math.floor(gif.pagination.total_count / 12)
                console.log(gif);
                for (let index = 0; index < 12; index++) {
                    template += `<img src="${urlsgif[index].images.original.url}" alt="${urlsgif[index].title}">`
                    conteo = index
                }
                divGif.innerHTML = template
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
                conteo += 1
                console.log(conteo);
                paginationButtons.onChange(e => {
                    let numButton = e.target.value
                    numButton = (numButton * 12) - 12
                    console.log('-- changed', numButton)
                    fetch(`https://api.giphy.com/v1/gifs/search?api_key=vPpkELaH3rnKb94KI9Mz8KU8apj5qZjr&q=${selectData}&offset=${numButton}&limit=12`)
                        .then((res) => res.json(res))
                        .then((gif) => {
                            let urlsgif1 = gif.data
                            console.log(gif);
                            let template1 = ''
                            for (let index = 0; index < 12; index++) {
                                template1 += `<img src="${urlsgif1[index].images.original.url}" alt="${urlsgif1[index].title}">`
                            }
                            divGif.innerHTML = template1
                        })
                });
            })
    }
    searchWrapper.classList.remove("active");
    hr.classList.remove("active");
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
