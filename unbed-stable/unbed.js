/*//Checking if the page is loaded in an iframe
if(window.self != window.top) {
//Analyzing URL to check embed link
try {
if(window.parent.location.hostname.indexOf("https://genarcy.github.io") == -1) {
window.location.href = "https://genarcy.github.io";
} else {
//iFrame from host site
}
} catch (ex) {
//Blocking Embed...
window.location.href = "https://genarcy.netlify.app/unbed-stable/blocked/index.html/";
}
} 
*/