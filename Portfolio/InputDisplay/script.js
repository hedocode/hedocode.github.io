var index = 0;
var xs = 0;
var ys = 0;
/*
var sw = window.screen.width;
var sh = window.screen.height;
*/

document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	$("#txt").text(nomTouche);
});
