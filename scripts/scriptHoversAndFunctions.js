//Hover left y rigth sliders
for(let i = 0; i < slidersLeft.length; i++ ){
    slidersLeft[i].addEventListener('mouseover',() => {
        slidersLeft[i].setAttribute('src', './img/button-slider-left-hover.svg')})
    slidersLeft[i].addEventListener('mouseout', () => {
        if(slidersLeft[i].classList.contains('mod-noc')){
            slidersLeft[i].setAttribute('src', './img/button-slider-left-md-noct.svg')
        }else{
            slidersLeft[i].setAttribute('src', './img/button-slider-left.svg')
        }
    })
}

for(let i = 0; i < slidersRight.length; i++){
    slidersRight[i].addEventListener('mouseover',() => {
        slidersRight[i].setAttribute('src', './img/Button-Slider-right-hover.svg')})
    slidersRight[i].addEventListener('mouseout', () => {
        if(slidersRight[i].classList.contains('mod-noc')){
            slidersRight[i].setAttribute('src', './img/button-slider-right-md-noct.svg')
        }else{
            slidersRight[i].setAttribute('src', './img/Button-Slider-right.svg')     
        }
    })
}

//Hover boton crear gifos
crearGifo.addEventListener('mouseover', () =>{
    switch (crearGifo.getAttribute('src')) {
        case './img/button-crear-gifo.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-hover.svg')
            break;
    
        case './img/CTA-crar-gifo-modo-noc.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-hover-modo-noc.svg')
            break
        
        case './img/CTA-crear-gifo-active.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-active.svg')
            break

        case './img/CTA-crear-gifo-active-modo-noc.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-active-modo-noc.svg')
            break
    }
})

crearGifo.addEventListener('mouseout', () =>{
    switch (crearGifo.getAttribute('src')) {
        case './img/CTA-crear-gifo-hover.svg':
            crearGifo.setAttribute('src', './img/button-crear-gifo.svg')
            break;
    
        case './img/CTA-crear-gifo-hover-modo-noc.svg':
            crearGifo.setAttribute('src', './img/CTA-crar-gifo-modo-noc.svg')
            break
        
        case './img/CTA-crear-gifo-active.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-active.svg')
            break

        case './img/CTA-crear-gifo-active-modo-noc.svg':
            crearGifo.setAttribute('src', './img/CTA-crear-gifo-active-modo-noc.svg')
            break
    }
})

//Funcion de display flex a la caja hover de los gifs
const boxHoverFlex = (e) => {
    if(e.target.classList.contains('gif')){
        e.target.nextElementSibling.style.display = 'flex'
}}

//Funcion quitar el hover box de los gif
const boxHoverNone = (e) => {
    if(e.target.classList.contains('hover-box')){
       e.target.style.display = 'none'
}}

//Funcion hover de los botones de los Gif
const btnHover = (e, clase, btn) => {
    if(e.target.classList.contains(clase)){
        e.target.setAttribute('src', btn)
    }
}

//Funcion quitar hover
const quitBtnHover = (e, clase, btn) =>{
    if(e.target.classList.contains(clase)){
        e.target.setAttribute('src', btn)
    }
}

//Funcion de boton expandir gif
const maxGif = (e) => {
    if(e.target.classList.contains('expand-icon')){
        header.style.display = 'none'
        main.style.display = 'none'
        footer.style.display = 'none'
        boxExpand.style.display = 'block'
        
        let img = e.target.parentElement.parentElement.previousElementSibling
        gifMax.innerHTML = `<img src=${img.getAttribute('src')} alt="gif" data-id=${img.dataset.id}>`
        let info = e.target.parentElement.nextElementSibling
        dataGif.innerHTML= info.lastElementChild.innerHTML
}}

//Funcion cerrar expandir gif
const maxGifClose = () => {
    boxExpand.style.display = 'none'
    header.style.display = 'block'
    main.style.display = 'block'
    footer.style.display = 'flex'
}

//Funcion download
async function download(imgTrend){
    let a = document.createElement('a')
    let response = await fetch(imgTrend.src)
    let file = await response.blob()
    a.download = 'MiNuevoGif.gif'
    a.href = window.URL.createObjectURL(file)
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':')
    a.click()
}

//Llamando a la funcion download
const downloadFunction = (e) =>{
    if(e.target.classList.contains('download-icon')){
        let img = e.target.parentElement.parentElement.previousElementSibling
        return download(img)
}}

//Funcion favorito activado/desactivado
const favActive = (e) => {
    if(e.target.classList.contains('fav-icon')){
        e.target.setAttribute('src', favActiveButton)
        e.target.classList.add('fav-icon-active')
        e.target.classList.remove('fav-icon')
        let img = e.target.parentElement.parentElement.parentElement.previousElementSibling.getAttribute('src')
        let title = e.target.parentElement.parentElement.nextElementSibling.lastElementChild.textContent
        let id = e.target.parentElement.parentElement.parentElement.previousElementSibling.dataset.id
        addFavorites(img,title,id)
    }else if(e.target.classList.contains('fav-icon-active')){
        e.target.setAttribute('src', favButton)
        e.target.classList.remove('fav-icon-active')
        e.target.classList.add('fav-icon')  
        let id = e.target.parentElement.parentElement.parentElement.previousElementSibling.dataset.id
        quitFavorites(id)
}}

//Funcion agregar favoritos
const addFavorites = (gif, title, id) => {
   
    let favoritesGif = {gif, title,id}
    favorites.push(favoritesGif)
    
    console.log(favorites)
    let favoriteArray = JSON.stringify(favorites)
    localStorage.setItem('favoritos', favoriteArray)
}

//Funcion llamar a favoritos
const callFavorites = () =>{
    favoritosBox.style.flexDirection = 'row'
    let saveFavorites = JSON.parse(localStorage['favoritos'])
    let save =  saveFavorites.map(item=>{
        return [item.id,item]
    });
    let saveMapArr = new Map(save);
    let filter = [...saveMapArr.values()]; 

    filter.forEach(item => {
        boxGif.querySelector('.gif').setAttribute('src', item.gif)
        boxGif.querySelector('.gif').classList = 'gif fav-gif'
        boxGif.querySelector('.gif').dataset.id = item.id
        boxGif.querySelector('.gif-box').classList = ' gif-box fav-gifs'
        boxGif.querySelector('.icon-fav img').setAttribute('src', favActiveButton)
        boxGif.querySelector('.icon-fav img').className = 'fav-icon-active pointer'
        boxGif.querySelector('.titulo-gif').textContent = item.title
        
        let clone = boxGif.cloneNode(true)
        fragment.appendChild(clone)
        
    })

    favoritosBox.appendChild(fragment)

}

//Funcion evitar repetidos
const onlyUnique = (value, index, self) =>{
    return self.indexOf(value) === index
}


//Funcion sin favoritos aun
const sinFavoritos = () =>{
    while(favoritosBox.firstChild){
        favoritosBox.removeChild(favoritosBox.firstChild)
    }
    
    iconFavSinContenido.setAttribute('src', './img/icon-fav-sin-contenido.svg')
    mensaje.textContent = '¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!'

    favoritosBox.style.flexDirection = 'column'
    favoritosBox.appendChild(iconFavSinContenido)
    favoritosBox.appendChild(mensaje)
}

//Funcion quitar de favoritos
const quitFavorites = (id) =>{
    let saveFavorites = JSON.parse(localStorage['favoritos'])

    let save = saveFavorites.map(item=>{
        return [item.id,item]
    });
    let saveMapArr = new Map(save);
    let filter = [...saveMapArr.values()]; 

    let indice = filter.findIndex((elemento) => {
        if (elemento.id === id) {
          return true;
        }
      });
      console.log(indice)
    if(indice >= 0){
        filter.splice(indice,1)
    }
    // if(indice >= 0){
    //     favorites.splice(indice,1)
    // }
    console.log(favorites)
     let favoriteArray = JSON.stringify(filter)
     localStorage.setItem('favoritos', favoriteArray)
}

//Funcion volver a pagina principal
const principalPage = () =>{
        favoritesSection.style.display = 'none'
        misGifosSection.style.display = 'none'
        crearGifosSection.style.display = 'none'
        searchSection.style.display = 'flex'
        trendingSection.style.display = 'flex'

        switch (crearGifo.getAttribute('src')) {
            case './img/CTA-crear-gifo-active.svg':
                crearGifo.setAttribute('src', './img/button-crear-gifo.svg')
                break;
        
            case './img/CTA-crear-gifo-active-modo-noc.svg':
                crearGifo.setAttribute('src', './img/CTA-crar-gifo-modo-noc.svg')
                break
        }

        linksColorBlue()
}

//Funcion cambiar el color de los links
const linksColorBlue = () => {
    for(let i = 0; i< links.length ; i++){
        if(links[i].className === 'links link-active'){
            links[i].style.color = '#572EE5'
            links[i].className = 'links'
        }
    }
}

//Funcion mostrar las secciones fav y mis gifos
const displaySections = (section, otherSection) =>{
    searchSection.style.display = 'none'
    crearGifosSection.style.display = 'none'
    otherSection.style.display = 'none'
    main.appendChild(section)
    section.after(trendingSection)
    section.style.display = 'flex'
}

//Funcion de los links activados (color)
const activeSection = (link) => {
    link.style.color = '#9CAFC3'
    linksColorBlue()
    link.classList.add('link-active')
}

//Funcion llamar a los trendings
const callTrendings = wordKey =>{
    wordKey.addEventListener('click', () => {
        buscador(wordKey.textContent)
        titleSearch.style.display = 'block'
        titleSearch.innerHTML= `<h3>${wordKey.textContent}</h3>`
    })
}

//Cambiar el logo
window.addEventListener('load', () =>{
    if(window.innerWidth > 901 ){
        logoGifos.setAttribute('src', './img/logo-desktop.svg')
     }else{
         logoGifos.setAttribute('src', './img/logo-mobile.svg')
    }
})
window.addEventListener('resize', ()=>{
    if(window.innerWidth > 901 && logoGifos.getAttribute('src') === './img/logo-desktop.svg'){
        logoGifos.setAttribute('src', './img/logo-desktop.svg')
    }else if(window.innerWidth > 901 && logoGifos.getAttribute('src') === './img/Logo-modo-noc.svg'){
        logoGifos.setAttribute('src', './img/Logo-modo-noc.svg')
    }else if(window.innerWidth > 901 && logoGifos.getAttribute('src') === './img/logo-mobile.svg'){
        logoGifos.setAttribute('src', './img/logo-desktop.svg')
    }else if(window.innerWidth > 901 && logoGifos.getAttribute('src') === './img/logo-mobile-modo-noct.svg'){
        logoGifos.setAttribute('src', './img/Logo-modo-noc.svg')
    }else if(window.innerWidth < 901 && logoGifos.getAttribute('src') === './img/logo-desktop.svg'){
        logoGifos.setAttribute('src', './img/logo-mobile.svg')
    }else if(window.innerWidth < 901 && logoGifos.getAttribute('src') === './img/logo-mobile.svg'){
        logoGifos.setAttribute('src', './img/logo-mobile.svg')
    }else if(window.innerWidth < 901 && logoGifos.getAttribute('src') === './img/logo-mobile-modo-noct.svg'){
        logoGifos.setAttribute('src', './img/logo-mobile-modo-noct.svg')
    }else if(window.innerWidth < 901 && logoGifos.getAttribute('src') === './img/Logo-modo-noc.svg'){
        logoGifos.setAttribute('src', './img/logo-mobile-modo-noct.svg')
    }
})

//Funcion copiar a portapapeles url de mis gifos
function updateClipboard(urlGif) {
    navigator.clipboard.writeText(urlGif).then(function () {
        alert('URL copiada en el portapapeles');
    }, function () {
        alert('no se a podido copiar');
    });
}

//Funcion trash de seccion mis gifos
const trash = e => {
    let saveMisGifos = JSON.parse(localStorage['misGifos'])

    let save = saveMisGifos.filter(onlyUnique)
    let img = e.target.parentElement.parentElement.parentElement.previousElementSibling
 
    if(save.indexOf(img.getAttribute('src') >= 0)){
        let i = save.indexOf(img.getAttribute('src'))
        save.splice(i,1)
    }
    if(misGifosUrl.indexOf(img.getAttribute('src') >= 0)){
        let i = favorites.indexOf(img.getAttribute('src'))
        misGifosUrl.splice(i,1)
    }

    let misGifosArray = JSON.stringify(save)
    localStorage.setItem('misGifos', misGifosArray)
}