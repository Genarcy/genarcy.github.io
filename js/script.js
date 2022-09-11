let dots = 0;

function cursorTracker(event) {
  var x1 = event.pageX - 10;
  var y1 = event.pageY - 80;

  var x2 = event.pageX + 4;
  var y2 = event.pageY - 80;

  var x3 = event.pageX - 10;
  var y3 = event.pageY - 80;

  var x4 = event.pageX - 35;
  var y4 = event.pageY - 116.5;


  let tracker = document.getElementById("tracker");
  let tracker2 = document.getElementById("tracker2");
  let tracker3 = document.getElementById("tracker3");
  let tracker4 = document.getElementById("tracker4");

  tracker.style.left = x1 + "px";
  tracker.style.top = y1 + "px";

  tracker2.style.left = x2 + "px";
  tracker2.style.top = y2 + "px";

  tracker3.style.left = x3 + "px";
  tracker3.style.top = y3 + "px";

  tracker4.style.left = x4 + "px";
  tracker4.style.top = y4 + "px";

  document.getElementById('location').innerHTML = "( X: " + event.pageX + ", Y: " + event.pageY + " )";
}


window.addEventListener("click", create => {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = (create.pageX - 4) + "px";
  dot.style.top = (create.pageY + 3) + "px";
  dot.innerHTML += "";
  document.body.appendChild(dot);
  document.getElementById("dotscreated").innerHTML = dots+1;
  dots = dots+1;
});
