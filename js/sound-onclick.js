function playClip() {
	if (navigator.appName == "Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 7")!=-1) || (navigator.appVersion.indexOf("MSIE 8") != -1) && document.all) {
		document.all.sound.src = "/audio/Genarcy.mp3";
	} else document.getElementsByTagName("audio")[0].play();
}

