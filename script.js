const iframeEle = document.getElementById("iframe-ele");
const htmlEle = document.getElementById("html-editor");
const cssEle = document.getElementById("css-editor");
const jsEle = document.getElementById("js-editor");

let html, css, js;

let initialHtml = `<h1>Welcome to code editor</h1>`;

function setIframeContent(iframe, { html, css, js }) {
  if (!html || html === "") {
    html = initialHtml;
    htmlEle.placeholder = html;
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
  if (!htmlStorage || htmlStorage == "") {
    html = initialHtml;
  } else {
    html = htmlStorage;
  }

  css = cssStorage;
  js = jsStorage;

  htmlEle.value = html;
  cssEle.value = css;
  jsEle.value = js;

  makeChanges();
} else if (htmlEle.value == "") {
  htmlEle.value = initialHtml;
  html = initialHtml;
}

function updateLocalStorage() {
  localStorage.setItem("html", html || "");
  localStorage.setItem("css", css || "");
  localStorage.setItem("js", js || "");
}

function checkIfMobile() {
  if (window.innerWidth < 800) {
    return true;
  }
  return false;
}

// Objects for CodeMirror Properties / Features
let defaultObject = {
  theme: "dracula",
  // Fixing delete line glitch for mobiles
  lineNumbers: checkIfMobile() ? false : true,
  lineWrapping: true,
  autoCloseBrackets: true,
  inputStyle: "contenteditable",
  showCursorWhenSelecting: true,
};

let htmlObject = {
  mode: "htmlmixed",
  value: htmlEle.value,
  autoCloseTags: true,
};

let cssObject = {
  mode: "css",
};

let jsObject = {
  mode: "javascript",
};

// Code Mirror Objects
let htmlCodeMirror = CodeMirror.fromTextArea(htmlEle, {
  ...defaultObject,
  ...htmlObject,
});

let cssCodeMirror = CodeMirror.fromTextArea(cssEle, {
  ...defaultObject,
  ...cssObject,
});

let jsCodeMirror = CodeMirror.fromTextArea(jsEle, {
  ...defaultObject,
  ...jsObject,
});

// updating values on change
setInterval(() => {
  if (
    html !== htmlCodeMirror.getValue() ||
    css !== cssCodeMirror.getValue() ||
    js !== jsCodeMirror.getValue()
  ) {
    html = htmlCodeMirror.getValue();
    css = cssCodeMirror.getValue();
    js = jsCodeMirror.getValue();

    makeChanges();
    updateLocalStorage();
  }
}, 2000);

// Adding Caches
// Checking if service worker supported by browser for caching site
if ("serviceWorker" in navigator) {
  // console.log('Service Worker Support');
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw_cached_pages.js") // Create any file name and create file with that name
      .then((reg) => console.log("Service Worker: Registered"))
      .catch((err) => console.log(`Service Worker: Error: ${err}`));
  });
}
