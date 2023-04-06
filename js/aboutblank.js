function loadPage() {
  var iframe = document.createElement('iframe');
  iframe.setAttribute('src', window.location.href);
  iframe.style.position = 'absolute';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  document.body.appendChild(iframe);
}
