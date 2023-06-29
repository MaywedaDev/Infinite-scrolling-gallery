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

console.log(status)


