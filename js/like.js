var loadWidget = function() {
        var d = document,
          w = window,
          l = window.location,
          p = l.protocol == "file:" ? "http://" : "//";
        if (!w.WS) w.WS = {};
        c = w.WS;
        var m = function(t, o) {
          var e = d.getElementsByTagName("script");
          e = e[e.length - 1];
          var n = d.createElement(t);
          if (t == "script") {
            n.async = true;
          }
          for (k in o) n[k] = o[k];
          e.parentNode.insertBefore(n, e)
        };
        m("script", {
          src: p + "bawkbox.com/widget/like-dislike/62bdf054e431f8001edbbb4e?page=" + encodeURIComponent(l + ''),
          type: 'text/javascript'
        });
        c.load_net = m;
      };
      if (window.Squarespace) {
        document.addEventListener('DOMContentLoaded', loadWidget);
        setTimeOut(function() {
          document.addEventListener('DOMContentLoaded', loadWidget);
        }, 3000)
      } else {
        loadWidget()
      }
