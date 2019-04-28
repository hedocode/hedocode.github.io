import module from "modules.js"

Vue.component('file',{
    props: ['file'],
    template: '<tr><td>{todo.title}</td> <td>{todo.extension}</td> <td>{todo.type}</td> <td>{todo.creationDate}</td> <td>{todo.modificationDate}</td> <td>{todo.pitch}</td> <td>{todo.keywords}</td></tr>'
})

var cssSelector = anime({
  targets: '#cssSelector .el',
  translateX: 250
});

var app = new Vue({
    el : '#app',
    data : {
        items : [
            {
                "title" : "Abribus",
                "extension" : ".md",
                "type" : "Markdown",
                "creationDate" : "June 30, 2018 9:50:20 PM",
                "modificationDate" : "December 3, 2018 10:24:15 PM",
                "pitch" : "Script de la série, court métrage \"Abribus\".",
                "keywords" : ["Scenario", "Movie", "Serie", "Fun", "sDramatic"]
            },
            {
                "title" : "Abribus",
                "extension" : ".md",
                "type" : "Markdown",
                "creationDate" : "June 30, 2018 9:50:20 PM",
                "modificationDate" : "September 19, 2018 4:15:02 AM",
                "pitch" : "Script de la série, court métrage \"Abribus\".",
                "keywords" : ["Scenario", "Movie", "Serie", "Fun", "sDramatic"]
            }
        ]
    }
  });

  var sortBy = (function() {
    var sorters = {
      string: function(a, b) {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      },
  
      number: function(a, b) {
        return a - b;
      }
    };
  
    return function(ary, prop) {
      var type = typeof ary[0][prop] || 'string';
      return ary.sort(function(a, b) {
        return sorters[type](a[prop], b[prop]);
      });
    };
  })();
