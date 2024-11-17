const siteUrl = '//127.0.0.1:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// load CSS
var head = document.querySelector('head')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random() * 9999999999999999);
head.appendChild(link);

// load html
var body = document.querySelector('body')[0];
boxHtml = `
    <div id="bookmarklet">
        <a href='#' id='close'>&times;</a>
        <h1> Select an image to bookmark: </h1>
    </div>
`;
body.insertAdjacentElement('afterend', boxHtml);
// body.innerHtml += boxHtml;


function bookmarkletLaunch() {
    bookmarklet = document.querySelector('div#bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');

    // clear images found
    imagesFound.innerHtml = '';

    // display bookmarklet
    bookmarklet.style.display = 'block';

    // close
    bookmarklet.querySelector('#close').addEventListener('click', function () {
        bookmarklet.style.display = 'none'
    });
}


//find image in the dom with minimum dimensions
images = document.querySelectorAll('img[src$=".jpg"], img[src$=".jpeg"], img[src$=".png"]');
images.forEach(image => {
    if (image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
        var imageFound = document.createElement('img');
        imageFound.src = image.src;
        imagesFound.append(imageFound);
    }
})
// launch the bookmarklet
bookmarkletLaunch();