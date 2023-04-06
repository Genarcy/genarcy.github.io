function loadPage() {
    var newWindow = window.open('about:blank', '_blank');
    newWindow.document.write('<html><head><title>Full-Screen Iframe</title></head><body style="margin:0;padding:0;"></body></html>');
  
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', window.location.href);
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
  
    newWindow.document.body.appendChild(iframe);
  }