const iframeEle = document.getElementById("iframe-ele");
const htmlEle = document.getElementById("html-editor");
const cssEle = document.getElementById("css-editor");
const jsEle = document.getElementById("js-editor");

let html, css, js;

let initialHtml = `<h1>Welcome to code editor</h1>`;

// On Changeing
htmlEle.oninput = () => {
  html = htmlEle.value;
  //   console.log("html", html);
  setIframeContent(iframeEle, { html: html, css: css, js: js });
};
cssEle.oninput = () => {
  css = cssEle.value;
  setIframeContent(iframeEle, { html: html, css: css, js: js });
};
jsEle.oninput = () => {
  js = jsEle.value;
  setIframeContent(iframeEle, { html: html, css: css, js: js });
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
