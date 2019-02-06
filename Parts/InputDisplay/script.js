var index = 0;
var xs = 0;
var ys = 0;
/*
var sw = window.screen.width;
var sh = window.screen.height;
*/
function emptyHiddenInput(){
	document.getElementById('hiddenInput').value = '';
}

function setKeyName(text){
	$("#KeyName").text(text);
}

function setKeyCode(text){
	if(text === undefined){
		$("#KeyCode").text("");
		return;
	}
	$("#KeyCode").text("Code : " + text);
}

document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	emptyHiddenInput();
	setKeyName(nomTouche);
	setKeyCode(event.keyCode);
});

document.addEventListener('click', (event) =>{
	var nomTouche = event.button;
	switch(nomTouche){
		case 0 : nomTouche = "LeftClick"; break;
		case 1 : nomTouche = "MiddleClick"; break;
		case 2 : nomTouche = "RightClick"; break;
		default : nomTouche = "MouseButton" + nomTouche; break;
	}
	setKeyName(nomTouche);
	setKeyCode();
});


document.addEventListener('scroll', (event) =>{
	setKeyName(event.detail);
});