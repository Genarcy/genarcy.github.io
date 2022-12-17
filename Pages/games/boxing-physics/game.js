window.Game = (function() {
  var Game = function() {
    this.registerEvents();
  };

  Game.prototype.registerEvents = function() {
    var _this = this;

    window.addEventListener("keydown", function(e) {
      // space and arrow keys
      if([8, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
    }, false);

    document.onmousedown = function() {
      window.focus();
    };

    document.addEventListener('DOMContentLoaded', function() {
      _this.resize();
    }, false);

    window.addEventListener('resize', function() {
      setTimeout(function() {
        // Do not resize in fullscreen
        if (!_this.fullscreen()) {
          _this.resize();
        }
      }, 1000);
    }, false);
  };

  Game.prototype.getQueryVariable = function(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){
        return pair[1];
      }
    }
    return(false);
  }

  Game.prototype.resize = function() {
    var template        = document.querySelector('.template-wrap');
    var canvas          = document.getElementById('canvas');
    var bg              = document.getElementById('background');
    var br              = document.getElementsByTagName('br')[0];

    var ratioTolerant   = this.getQueryVariable('ratio_tolerant');
    var gameSizeRatio   = canvas.getAttribute('width') / canvas.getAttribute('height');
    var maxHeight       = window.innerHeight - 56; // minus the footer
    var maxWidth        = window.innerWidth;
    var windowSizeRatio = maxWidth / maxHeight;
    var newStyle        = {
      width: canvas.getAttribute('width'),
      height: canvas.getAttribute('height')
    };

    if (ratioTolerant == 'true') {
      newStyle = { width: maxWidth, height: maxHeight };
    } else if (ratioTolerant == 'false') {
      if (gameSizeRatio > windowSizeRatio) {
        newStyle = { width: maxWidth, height: maxWidth / gameSizeRatio };
      } else {
        newStyle = { width: maxHeight * gameSizeRatio, height: maxHeight };
      }
    }

    if (br) {
      br.style.display = 'none';
    }

    this.updateStyle(canvas, newStyle);
    this.updateStyle(bg, newStyle);
  };

  Game.prototype.updateStyle = function(element, size) {
    element.setAttribute('width', size.width);
    element.setAttribute('height', size.height);
    element.style.width = size.width + 'px';
    element.style.height = size.height + 'px';
  };

  Game.prototype.fullscreen = function() {
    return document.fullscreenElement ||
           document.webkitFullscreenElement ||
           document.mozFullScreenElement ||
           document.msFullscreenElement;
  };

  return Game;
})();

var game = new Game();

function updateCanvasDim() {
  game.resize();
}
