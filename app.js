import { status } from "./util.js"
import { calcHeightAndWidth } from "./util.js"

var next_page = 'https://api.pexels.com/v1/curated/?page=&per_page=15'



const createImages = async () => {

    const pexelApiRequest = await fetch(next_page, {
        method: "GET",
        headers: {
            Authorization: `${import.meta.env.VITE_PEXELS_API_KEY}`
        }
    })

    const response = await pexelApiRequest.json()

    generateImages(response)
}

const generateImages = (data) => {
    const imageCont = document.getElementById("images")


    data.photos.forEach((el) => {
        imageCont.appendChild(createSingleImage(el))
    })

    next_page = data.next_page
}

const createSingleImage = (el) => {
    const div = document.createElement('div')
    const img = document.createElement("img")
    const a = document.createElement('a')
    const creds = createCredits(el.photographer, el.photographer_url)

    a.href = el.url
    a.classList.add('topexels')

    div.classList.add('imgbox')
    div.style.gridRow = `span ${ calcHeightAndWidth(el.width, el.height) }`

    img.alt = el.alt
    img.src = el.src.medium
    img.classList.add('w-100')


    div.appendChild(a)
    div.appendChild(creds)
    div.appendChild(img)

    return div
}

const createCredits = (name, url) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    const a = document.createElement('a')
    const made_by = document.createElement('span')

    p.innerText = name
    a.href = url
    a.classList.add('tophotographer')
    a.innerText = "Go to Photographer"
    made_by.innerText = "Made by"

    div.classList.add('credits')
    div.appendChild(made_by)
    div.appendChild(p)
    div.appendChild(a)

    return div
}

const getMoreImages = () => {
    if(window.scrollY >= (document.documentElement.offsetHeight - window.innerHeight)){
        console.log('reached bottom')
        createImages();
    }      
}

window.addEventListener('scroll', getMoreImages)

console.log(status)

createImages();

