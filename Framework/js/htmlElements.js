var selects = document.getElementsByClassName('select');

var combo = document.getElementsByClassName('combo');

var tips = document.getElementsByClassName('tips');


function toggleChildren(el){
    el.style.position = "relative";
    for (let i = 0; i < el.children.length; i++) {
        var child = el.children[i];
        child.style.display = (child.style.display == 'none' ? 'flex' : 'none');
    }
}

function toggleActive(el){
    var active = el.parentNode.getElementsByClassName('active');
    active[0].classList.remove('active');
    el.classList.toggle('active');
}

for (let i = 0; i < selects.length; i++) {
    const select = selects[i];

    for (let i = 0; i < select.children.length; i++) {
        const child = select.children[i];

        child.onclick = function(){toggleActive(child)};
    }
    select.onclick = function(){toggleChildren(select)};
    toggleChildren(select);
}


console.log("Loaded");