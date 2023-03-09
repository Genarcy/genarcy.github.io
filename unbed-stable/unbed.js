if(window.self != window.top) {
try {
if(window.parent.location.hostname.indexOf("https://genarcy.github.io") == -1) {
window.location.href = "https://genarcy.github.io";
} else {
}
} catch (ex) {
window.location.href = "/unbed-stable/blocked/index.html";
}
} 
