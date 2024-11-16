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
body.innerHtml += boxHtml;