window.onload = function () {
	var inputy_1 = document.getElementById('page-1').getElementsByTagName('input');
	var zaznaczone = 0;
	for (i = 0; i < inputy_1.length; i++) {
		inputy_1[i].onclick = function () {
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
						addClassToCircle(elem,  'success');
					}
				}
			}
		}
	}

	var inputy_2 = document.getElementById('page-2').getElementsByTagName('input');
	var inputy_3 = document.getElementById('page-3').getElementsByTagName('input');
    checkInputValue(inputy_2);
    checkInputValue(inputy_3);

	var passwordIp = document.getElementsByName('password')[0];
	passwordIp.onkeyup = function () {
		var check = checkPassword(this.value);
		this.parentNode.getElementsByTagName('meter')[0].value = check[1];
		if (check[0]) {
			resetClassForCircle(getElementCircle(this))
			addClassSuccess(getElementCircle(this));
		} else if ( 0 === check[0] ) {
			resetClassForCircle(getElementCircle(this));
		} else {
			resetClassForCircle(getElementCircle(this));
			addClassToCircle(getElementCircle(this), 'error');
		}
	}

	document.getElementById('ok').onclick = function() {
		validForm(zaznaczone, inputy_2, inputy_3);
	}
}

var strona = 1;
var formError = 'Błąd!';
var password = 'Hasło nie może być puste';

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
	element.id = ('zaznaczony'+numer);
}


function checkPassword(value) {
	var count_condition = 0;
		if (/[A-Z]/.test(value)) {
			count_condition++;
		}
		if (/[-!$%#^@&*()_+|~=`{}\[\]:';'<>?,.\/]/.test(value)) {
			count_condition++;
		}
		if (/[0-9]/.test(value)) {
			count_condition++;
		}
		if (/[a-z]/.test(value)) {
			count_condition++;
		}
	if ( 3 <= count_condition && 8 <= value.length ) {
		password = '';
		return [true, count_condition+2];
	} else if( 0 === value.length ) {
		password = '\tHasło nie może być puste';
		return [0, 0];
	} else {
		password = '\tHasło musi mieć conajmniej 8 znaków i' +
			' zawierać conajmniej 3 rozdaje z listy:\n' +
			'\t\tDuża litera\n' +
			'\t\tMała litera\n' +
			'\t\tCyfra\n' +
			'\t\tZnak specjalny\n';
		if ( 8 <= value.length ) {
			return [false, count_condition+2];
		} else {
			return [false, count_condition];
		}
	}
}


function checkInputValue(inputList) {
	for (var i = 0; i < inputList.length; i++) {
		inputList[i].onkeyup = function() {
			var elementCircle = getElementCircle(this);
			if (new RegExp(this.getAttribute('pattern')).test(this.value)) {
				resetClassForCircle(elementCircle);
				addClassToCircle(elementCircle, 'success');
			} else if (0 == this.value.length) {
				resetClassForCircle(elementCircle);
			} else {
				resetClassForCircle(elementCircle);
				addClassToCircle(elementCircle, 'error');
			}
		}
	}
}

function validPage(inputList) {
	for (var i = 0; i < inputList.length; i++) {
		if ( -1 === getElementCircle(inputList[i]).className.indexOf('success') ) {
			formError += '\n' + inputList[i].title;
		}
	}
}

function validForm(count_page_1, inputy_2, inputy_3) {
	formError = 'Błąd!'
	if ( 3 != count_page_1 ) {
		formError += '\n' + 'Zaznacz dokładnie 3 języki';
	}
	validPage(inputy_2);
	validPage(inputy_3);
	if (password) {
		formError +=  password;
	}
	if ( 5 < formError.length ) {
		alert(formError);
	}
}


function nastepnaStrona() {
	document.getElementById('page-' + strona).style.display = 'none';
	strona += 1;
	document.getElementById('page-' + strona).style.display = 'block';
	if (3 == strona) {
		document.getElementById('next').disabled = true;
	} else {
		document.getElementById('previous').disabled = false;
	}
}

function poprzedniaStrona() {
	document.getElementById('page-' + strona).style.display = 'none';
	strona -= 1;
	document.getElementById('page-' + strona).style.display
		= 'block';
	if (1 == strona) {
		document.getElementById('previous').disabled = true;
	} else {
		document.getElementById('next').disabled = false;
	}
}