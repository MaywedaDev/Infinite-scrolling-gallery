export const status = 'It works?'

export const createImages = async (url, cb) => {

    const pexelApiRequest = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `${import.meta.env.VITE_PEXELS_API_KEY}`
        }
    })

    const response = await pexelApiRequest.json()

    generateImages(response, cb)
}

 const generateImages = (data, cb) => {
    const imageCont = document.getElementById("images")


    data.photos.forEach((el) => {
        imageCont.appendChild(createSingleImage(el))
    })

    cb(data.next_page)
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

export const queryBuilder = (per_page, size, color, search) => {
    let query = 'https://api.pexels.com/v1/search/'
    if(search != ''){
        query += `?query=${search}`
    }
    if(per_page != "" ){
        query += `&per_page=${per_page}`
    }
    if (size != ''){
        query += `&size=${size}`
    }
    if(color != ''){
        query += `&color=${color}`
    }
    

    return query
}



const calcHeightAndWidth = (width, height) => {
    const compressionRatio = Math.round(width / 250)
    const calculatedHeight = height / compressionRatio

    const rowSpan = Math.floor(calculatedHeight / 10)

    return rowSpan
}