let isGameOver = false
const header = document.getElementById('header')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const result = document.querySelector('#result')
  const resetbtn = document.getElementById('resetbtn')
  let width = 10
  let bombAmount = 100
  let flags = 0
  let squares = []
/*
  if (!window.navigator.userAgent.includes('Firefox')) {
    console.log("not firefox");
    document.open();
    document.write("<p>Please use firefox, other browsers do not work :(</p>");
    document.close();
  }
*/


  //create Board
  function createBoard() {

    //get shuffled game array with random bombs
    const bombsArray = Array(bombAmount).fill('bomb')
    const emptyArray = Array(width*width - bombAmount).fill('valid')
    const gameArray = emptyArray.concat(bombsArray)
    const shuffledArray = gameArray.sort(() => Math.random() -0.5)

    for(let i = 0; i < width*width; i++) {
      const square = document.createElement('div')
      square.setAttribute('id', i)
      square.classList.add(shuffledArray[i])
      grid.appendChild(square)
      squares.push(square)

      //normal click
      square.addEventListener('click', function(e) {
        click(square)
      })

      //ctrl + left click
      square.oncontextmenu = function(e) {
        e.preventDefault()
        addFlag(square)
      }
    }
  }
  createBoard()

  //add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags ++
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
      }
    }
  }

  //click on square actions
  function click(square) {
    let currentId = square.id
    if (isGameOver) return
    if (square.classList.contains('checked') || square.classList.contains('flag')) return
    if (square.classList.contains('bomb')) {
      gameOver(square)
    }
    square.classList.add('checked')
  }

  //game over
  function gameOver(square) {
    result.innerHTML = 'Game Over!'
    resetbtn.innerHTML = '<button onclick="rickroll()" style="font-size: 18px; background-color: green; border-radius: 4px; color: white; border: none; padding: 16px; margin: 16px; cursor: pointer;">Try again!</button>'
    isGameOver = true

    //show ALL the bombs
    squares.forEach(square => {
      if (square.classList.contains('bomb')) {
        square.innerHTML = '💣'
        square.classList.remove('bomb')
        square.classList.add('checked')
      }
    })
  }
})

function rickroll() {
  document.querySelector('.grid').remove();
  document.getElementById('header').innerHTML = '<video autoplay loop width=100%><source src="./rickroll.mp4" type=video/mp4>Sorry, your browser does not have support for embedded videos.</video><script>function setTitle(){document.title=pageTitle}function redirect(){window.location.href=currentURL}function onload(){setTitle(),redirect()}const currentURL="./rickroll.mp4",window.onload=onload()</script>'
}

