function listener(event) {
    switch(event.type) {
      case "animationend":
        console.log(`Ended: elapsed time is ${event.elapsedTime}`)
        let foo = document.getElementById("box");
        foo.remove();
        document.getElementById('blank').style.animation="slide-out-blank 0.5s";
        
        
        
        
        break;
  
    }
  }
  
  const element = document.getElementById("box");
  element.addEventListener("animationend", listener, false);
  element.className = "box";
  
  
  
  function listener2(event) {
    switch(event.type) {
      case "animationend":
        console.log(`Ended: elapsed time is ${event.elapsedTime}`)
        let foe = document.getElementById("blank");
        foe.remove();
        
        
        
        break;
  
    }
  }
  
  const element2 = document.getElementById("blank");
  element2.addEventListener("animationend", listener2, false);
  element2.className = "blank";
