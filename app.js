import { status } from "./util.js"
import { createImages } from "./util.js"

var next_page = 'https://api.pexels.com/v1/curated/?page=&per_page=15'

const pageCtrls = document.getElementById('per_page')


pageCtrls.addEventListener('change', (e) => {
    next_page = 'https://api.pexels.com/v1/curated/' + `?per_page=${+e.target.value}`
    createImages(next_page, (data) => {
        next_page = data
    } );
})

const getMoreImages = () => {
    if(window.scrollY >= (document.documentElement.offsetHeight - window.innerHeight)){
        console.log('reached bottom')
        createImages(next_page, (data) => {
            next_page = data
        } );
    }      
}

window.addEventListener('scroll', getMoreImages)

console.log(status)

createImages(next_page, (data) => {
    next_page = data
} );

