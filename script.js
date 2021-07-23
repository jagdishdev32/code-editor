const iframeEle = document.getElementById("iframe-ele");
const htmlEle = document.getElementById("html-editor");
const cssEle = document.getElementById("css-editor");
const jsEle = document.getElementById("js-editor");

let html, css, js;

let initialHtml = `<h1>Welcome to code editor</h1>`;

// On Change
htmlEle.oninput = () => {
  html = htmlEle.value;
  makeChanges();
  updateLocalStorage();
  //   setIframeContent(iframeEle, { html: html, css: css, js: js });
};
cssEle.oninput = () => {
  css = cssEle.value;
  makeChanges();
  updateLocalStorage();
  //   setIframeContent(iframeEle, { html: html, css: css, js: js });
};
jsEle.oninput = () => {
  js = jsEle.value;
  makeChanges();
  updateLocalStorage();
  //   setIframeContent(iframeEle, { html: html, css: css, js: js });
};

function setIframeContent(iframe, { html, css, js }) {
  if (!html || html === "") {
    html = initialHtml;
  }

  const source = `
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;
  iframe.srcdoc = source;
}

setIframeContent(iframeEle, { html: initialHtml, css: "", js: "" });

// Make changes from 1 place
function makeChanges() {
  setIframeContent(iframeEle, { html: html, css: css, js: js });
}

// Checking if exists
let htmlStorage = localStorage.getItem("html");
let cssStorage = localStorage.getItem("css");
let jsStorage = localStorage.getItem("js");

// Updating value if value exists
if (htmlStorage || cssStorage || jsStorage) {
  html = htmlStorage;
  css = cssStorage;
  js = jsStorage;

  htmlEle.value = html;
  cssEle.value = css;
  jsEle.value = js;

  makeChanges();
}

function updateLocalStorage() {
  localStorage.setItem("html", html);
  localStorage.setItem("css", css);
  localStorage.setItem("js", js);
}
