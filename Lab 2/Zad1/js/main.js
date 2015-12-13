window.onload = function () {
	var inputy = document.getElementsByTagName("input");
	var zaznaczone = 0;
	for (i = 0; i < inputy.length; i++) {
		inputy[i].onclick = function () {
			tmp = parseInt(getElementCircle(this).id.replace( /^\D+/g, ''));
			if (this.parentNode.getElementsByTagName('input')[0].checked) {
				zaznaczone += 1;
				addIdToCircle(this, zaznaczone)
				if (zaznaczone <= 3) {
					addClassToCircle(getElementCircle(this), 'success');
				} else {
					addClassToCircle(getElementCircle(this), 'error');
				}
			} else {
				zaznaczone -= 1;
				resetClassForCircle(getElementCircle(this));
				resetIdForCircle(this);
				for (i = tmp; i <= zaznaczone; i++){
					elem = document.getElementById('zaznaczony'+(i+1));
					toggleIdForCircle(elem, i);
					if (i <= 3) {
						resetClassForCircle(elem);
						addClassToCircle(elem,  'success')
					}
				}
			}
		}
	}
}

function getElementCircle(element) {
	return element.parentNode.getElementsByClassName('valid-box')[0];
}

function resetClassForCircle(element) {
	element.className = ('valid-box');
}

function addClassToCircle(element, klasa) {
	element.className += (' '+klasa)
}

function addClassSuccess(element) {
	element.className = ('valid-box success');
}

function resetIdForCircle(element) {
	getElementCircle(element).id = ('');
}

function addIdToCircle(element, numer) {
	getElementCircle(element).id += ('zaznaczony'+numer);
}

function toggleIdForCircle(element, numer) {
	console.log(element);
	element.id = ('zaznaczony'+numer);
}