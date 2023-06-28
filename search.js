import { createImages } from "./util"

const searchQuery = new URLSearchParams(window.location.search);

var size_query = ''

var color_query = ''

var pageQuery = ''

console.log(searchQuery.get('search'))

const searchInput = document.getElementById('search')
const header = document.getElementById('query_name')

var next_page = `https://api.pexels.com/v1/search/?query=${searchQuery.get('search')}`

const pageCtrls = document.getElementById('per_page')

searchInput.value = `${searchQuery.get('search')} photos` || ''
header.innerHTML = searchQuery.get('search') || ''

// pageCtrls.addEventListener('change', (e) => {
//     next_page = 'https://api.pexels.com/v1/search' + `?per_page=${+e.target.value}`
//     createImages(next_page);
// })

const getMoreImages = () => {
    if(window.scrollY >= (document.documentElement.offsetHeight - window.innerHeight)){
        console.log('reached bottom')
        createImages(next_page, (data) => {
            next_page = data
        });
    }      
}

window.addEventListener('scroll', getMoreImages)


createImages(next_page, (data) => {
    next_page = data
});