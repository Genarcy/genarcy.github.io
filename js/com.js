 if (!window.hcb_user) {
        hcb_user = {};
      }(function() {
        var s = document.createElement("script"),
          l = hcb_user.PAGE || ("" + window.location).replace(/'/g, "%27"),
          h = "https://www.htmlcommentbox.com";
        s.setAttribute("type", "text/javascript");
        s.setAttribute("src", h + "/jread?page=" + encodeURIComponent(l).replace("+", "%2B") + "&opts=16798&num=10&ts=1656613942991");
        if (typeof s != "undefined") document.getElementsByTagName("head")[0].appendChild(s);
      })(); /*-->*/
