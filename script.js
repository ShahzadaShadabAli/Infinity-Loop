const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let totalImage=0;
let imagesLoaded=0;
let ready=false;
let photosArray=[];

// function setAttributes(element, attributes){
//     for (const key in attributes){
//         document.setAttribute(key, attributes(key))
//     }
// }

function imgLoaded(){

   imagesLoaded++
   if(imagesLoaded === totalImage){
    loader.hidden = true;
    ready = true;
   }
}

//element for links and photos
function displayPhotos(){
    imagesLoaded=0;
    totalImage=photosArray.length
    //run for each objects in photos array
    photosArray.forEach((photo) =>{
        //create <a> to unsplash
        const item = document.createElement('a')
        item.setAttribute('href', photo.links.html)
        item.setAttribute('target', '_blank')
        // setAttributes(item, {
        //     href: photo.links.html,
        //     target: '_blank',
        // })

        //create <img> for photo
        const img = document.createElement('img')
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description)
        img.setAttribute('title', photo.alt_description)
        // setAttributes(img, {
        //     src: photo.urls.regular,
        //     alt: photo.alt_description,
        //     title:photo.alt_description,
        // })

        //checking the loading of image
        img.addEventListener('load', imgLoaded())

        //putting <img> and <a> together
        item.appendChild(img)
        imgContainer.appendChild(item)
    })
}

 

//Unsplash Api
const picLimit = 30;
const apiKey = 'HI3nnZZ-p-zPLZiXfJhpb_eHKZHwjyIC8_zZ4uUWx_E';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picLimit}`

//Get Photos From Unsplash
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }catch (error){
        //error here
    }
}



//Uploading more image on scrolling
window.addEventListener('scroll', function() {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
       ready=false;
       displayPhotos()
    }
})

   

//on load
getPhotos();