window.onload = function () {
	var inputy = document.getElementsByTagName("input");
	for (i = 0; i < inputy.length; i++) {
		inputy[i].onclick = function () {
			console.log(this.parentNode.childNodes.className);
			this.parentNode.childNodes.className + " good";
		}
	}
}