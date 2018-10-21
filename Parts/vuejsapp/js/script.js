console.log('script.js - Loader');

ash('js/hscript.js');
asb('js/vueapp.js'); 



function addScript( src ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    document.head.appendChild( s );
  }
  
/**
 * Add a Script to the end of the head
 * @param {*} src
 */
function ash( src ) {
    var s = document.createElement('script'); s.setAttribute('src', src);
    document.head.appendChild( s );
}

/**
 * Add a Script to the end of the body
 * @param {*} src 
 */
function asb( src ) {
    document.addEventListener('DOMContentLoaded', function () {
        var s = document.createElement('script'); s.setAttribute('src', src)
        document.body.appendChild( s );
    });
}

/**
 * create and return a script element with the src value 
 * @param {*} src 
 */
function createScript( src ){
    var e = document.createElement('script').setAttribute('src', src);
    return e;
}


