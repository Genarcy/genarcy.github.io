const carouselText = [
  {text: "Added more games to our website and change the theme. next its gonna be blue heheh.(0rca)(10/18/22)", color: "red"},
  {text: "Changed the name of the website to Genarcy. (smileman52)(7/27/22)", color: "red"},
  {text: "I changed a lot of the website. the discord is now on the chat page(smileman52)(7/28/22)", color: "red"},
  {text: "0rc4 added discord to the webiste. Its in the extra page.(smileman52)(7/25/22)", color: "red"},
  {text: "lots of changes to the home screen and n-gon is hosted on the website.(smileman52)(7/19/22)", color: "red"},
  {text: "Added Alot of more games...Check them out(0rc4)(7/6/22)", color: "red"},
  {text: "I added cyclonehacks's minecraft server. its on the games tab(smileman52)(7/5/22)", color: "red"},
  {text: "Added some new games with gfiles. Thank to Rena for giving them to me.(0rc4)(6/30/22)", color: "red"},
  {text: "Im now back and updated Private policy and terms and conditions.(0rc4)(6/25/2022)", color: "red"},
  {text: "Being out for a couple of days for personal reasons... Smile man on charge (0rc4)(6/22/2022)", color: "red"},
  {text: "Sorry Guys 1v1.LOL can't be hosted. Sorry. (smileman52)(6/20/2022) ", color: "red"},
  {text: "Made the game 1 be hosted on the website. (smileman52)(6/12/2022) ", color: "red"},
  {text: "Adding more games soon", color: "red"}
]

// use this a a templete  {text: "text", color: "red"}

$( document ).ready(async function() {
  carousel(carouselText, "#feature-text")
});

async function typeSentence(sentence, eleRef, delay = 15 ){
  const letters = sentence.split("");
  let i = 0;
  while(i < letters.length) {
    await waitForMs(delay);
    $(eleRef).append(letters[i]);
    i++
  }
  return;
}

async function deleteSentence(eleRef) {
  const sentence = $(eleRef).html();
  const letters = sentence.split("");
  let i = 0;
    $(eleRef).append("<br>");
  }

async function carousel(carouselList, eleRef) {
    var i = 0;
    while(true) {
      updateFontColor(eleRef, carouselList[i].color)
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(250);
      await deleteSentence(eleRef);
      i++
      if(i >= carouselList.length) {return;}
    }
}

function updateFontColor(eleRef, color) {
  $(eleRef).css('color', color);
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

