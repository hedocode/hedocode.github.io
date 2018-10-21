var index = 0;
var xs = 0;
var ys = 0;
/*
var sw = window.screen.width;
var sh = window.screen.height;
*/

$(".bigtxt").each(function(){
	var length = this.innerHTML.length;
	var size;
	size = 100 / length;
	console.log(size);
	console.log(size*length);
	$(this).css({ 'font-size': size+'vw' });
});

document.addEventListener('keydown', (event) => {
	const nomTouche = event.key;
	if (nomTouche === 'ArrowRight') {
		index = inc(index, 4);
		move();
    		return;
  	}
	if (nomTouche === 'ArrowLeft') {
		index = dec(index, 0);
		move();
    		return;
  	}
});

function inc(x, maxi){
	if(x + 1 >= maxi)
		return maxi;
	return x + 1;
};


function dec(x, mini){
	if (x - 1 <= mini)
		return mini;
	return x - 1;
};

function move(){
	window.scroll(0, index * document.documentElement.clientHeight);
};
