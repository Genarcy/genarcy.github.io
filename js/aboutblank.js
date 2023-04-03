function openInIframe() {
    var url = window.location.href;
    
    var newTab = window.open('about:blank');

    newTab.addEventListener('load', function() {
        var iframe = document.createElement('iframe');

        iframe.src = url;

        iframe.style.position = "fixed";
        iframe.style.top = "0";
        iframe.style.left = "0";
        iframe.style.width = "100%";
        iframe.style.height = "100%";

        // Add the iframe to the new tab
        newTab.document.body.appendChild(iframe);
    });
}