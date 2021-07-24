// Add Code Mirror
const iframeEle = document.getElementById("iframe-ele");
const htmlEle = document.getElementById("html-editor");
const cssEle = document.getElementById("css-editor");
const jsEle = document.getElementById("js-editor");

let html, css, js;

let initialHtml = `
  <h1>Welcome to code editor</h1>
  <!-- <p>start coding now</p> -->
`;
let initialCss = `
  body {
    /* background-color: red; */
  }
`;

// // On Change
// htmlEle.onchange = () => {
//   html = htmlEle.value;
//   makeChanges();
//   updateLocalStorage();
// };

// cssEle.onchange = () => {
//   css = cssEle.value;
//   makeChanges();
//   updateLocalStorage();
// };

// jsEle.onchange = () => {
//   js = jsEle.value;
//   makeChanges();
//   updateLocalStorage();
// };

function setIframeContent(iframe, { html, css, js }) {
  if (!html || html === "") {
    html = initialHtml;
    css = initialCss;
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

setIframeContent(iframeEle, { html: initialHtml, css: initialCss, js: "" });

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
  localStorage.setItem("html", html || "");
  localStorage.setItem("css", css || "");
  localStorage.setItem("js", js || "");
}

let htmlCodeMirror = CodeMirror.fromTextArea(htmlEle, {
  mode: "xml",
  theme: "dracula",
  lineNumbers: true,
  value: htmlEle.value,
});

let cssCodeMirror = CodeMirror.fromTextArea(cssEle, {
  mode: "css",
  theme: "dracula",
  lineNumbers: true,
});

let jsCodeMirror = CodeMirror.fromTextArea(jsEle, {
  mode: "javascript",
  theme: "dracula",
  lineNumbers: true,
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
