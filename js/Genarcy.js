  function playSound(animal) {
  document.getElementById(animal).play();
};
window.addEventListener("beforeunload", (event) => {
  event.returnValue = true;
});
