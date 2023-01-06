function currentTime() {
        var date = new Date(); /* creating object of Date class */
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        let session = "AM";
        if(hh == 0){
          hh = 12;
      }
      if(hh > 12){
          hh = hh - 12;
          session = "PM";
       }

        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        document.getElementById("clock").innerText = hour + " : " + min + " : " + sec; /* adding time to the div */
        var t = setTimeout(function() {
          currentTime()
        }, 1000); /* setting timer */
      }

      function updateTime(k) {
        if (k < 10) {
          return "0" + k;
        } else if (k > 12) {
          return k - 12;
        } else {
        return k;
        }
      }
      currentTime(); /* calling currentTime() function to initiate the process */

 