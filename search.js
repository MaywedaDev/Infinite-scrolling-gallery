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

searchInput.value = search_query || ''
header.innerHTML = `${search_query} photos` || ''

pageCtrls.addEventListener('change', (e) => {
    pageQuery = e.target.value
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)
    createImages(next_page, (data) => {
        next_page = data
    });
})

colorCtrls.addEventListener('change', (e) => {
    imageCont.innerHTML = ''
    color_query = e.target.value.replace('#', '')

  
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)
    console.log(next_page)

})

sizeCtrls.addEventListener('change', (e) => {
    imageCont.innerHTML = ''
    size_query = e.target.value
    next_page = queryBuilder(pageQuery, size_query, color_query, search_query)

})


// window.addEventListener('scroll', getMoreImages)

const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].intersectionRatio <= 0) return;
    // load more content;
    createImages(next_page, (data) => {
        next_page = data
    });
  });
  // start observing
intersectionObserver.observe(document.querySelector("#more"));



