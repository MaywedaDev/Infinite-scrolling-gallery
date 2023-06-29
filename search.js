import { createImages } from "./util"
import { queryBuilder } from "./util";

const searchQuery = new URLSearchParams(window.location.search);

var size_query = ''

var color_query = ''

var pageQuery = '10'

console.log(searchQuery.get('search'))

const searchInput = document.getElementById('search')
const header = document.getElementById('query_name')

const search_query = searchQuery.get('search')

var next_page = `https://api.pexels.com/v1/search/?query=${search_query}&color=#ff0000`

const pageCtrls = document.getElementById('per_page')
const colorCtrls = document.getElementById('color')
const sizeCtrls = document.getElementById('size')
const imageCont = document.getElementById("images")

searchInput.value = `${searchQuery.get('search')} photos` || ''
header.innerHTML = searchQuery.get('search') || ''

pageCtrls.addEventListener('change', (e) => {
    pageQuery = e.target.value
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)
    createImages(next_page);
})

colorCtrls.addEventListener('change', (e) => {
    imageCont.innerHTML = ''
    color_query = e.target.value
    // console.log(e.target.value)
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)
    console.log(next_page)
    createImages(next_page);
})

sizeCtrls.addEventListener('change', (e) => {
    imageCont.innerHTML = ''
    size_query = e.target.value
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)
    createImages(next_page);
})

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