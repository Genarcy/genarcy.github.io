//Checking if the page is loaded in an iframe
if(window.self != window.top) {
try {
if(window.parent.location.hostname.indexOf("https://genarcy.github.io") == -1) {
window.location.href = "https://genarcy.github.io";
} else {
}
} catch (ex) {
//Blocking Embed...
window.location.href = "/unbed-stable/blocked/index.html";
}
} 
