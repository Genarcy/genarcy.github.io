const gascript = document.createElement("script");
gascript.setAttribute("async", "");
gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-XWJJ5LHNR2");
const inlinegascript = document.createElement("script");
inlinegascript.innerHTML = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XWJJ5LHNR2');`;
document.head.append(gascript, inlinegascript);