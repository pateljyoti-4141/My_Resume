const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray = [];

let initialLoad=true;

// Unsplash API
let count =5;
const apiKey = 'gxUoo3o8xsxAepnkzpHMkfHEZ5rtfMywg1JROhufACM';let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =',ready);
   
    }
}

// Helper Funtion to Set Attributes on DOM Elements
function setAttribute(Element, attributes){
    for (const key in attributes){
        Element.setAttribute(key, attributes[key]);
    }
}




// Create Element For links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    //RUn function for each object in photosArray
    photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank')
    setAttribute(item, {
        href: photo.links.html,
        target: '_blank'
        });

    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    
      setAttribute(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
      })
      // Event Listner, check when each is finished loading
      img.addEventListener('load', imageLoaded);


      // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);

    });

}

// Get photos from Unnsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
   if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    count=30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    ready=false;
    getPhotos();
    
   }
})

// On Load
getPhotos();