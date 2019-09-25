var selects = document.getElementsByClassName('select');

var combo = document.getElementsByClassName('combo');

var tips = document.getElementsByClassName('tips');


function toggleChildren(el){
    el.style.position = "relative";
    for (var i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        child.style.display = (child.style.display == 'none' ? 'flex' : 'none');
    }
}

function toggleActive(el){
    var active = el.parentNode.getElementsByClassName('active');
    active[0].classList.remove('active');
    el.classList.toggle('active');
}


for (var i = 0; i < selects.length; i++) {
    var select = selects[i];
    
    for (var i = 0; i < select.children.length; i++) {
        var child = select.children[i];
        console.log(child);
        child.onclick = toggleActive(child);
        console.log(child);
    }
    select.onclick = toggleChildren(select);
    toggleChildren(select);
}


console.log("Loaded");