console.log('vueapp.js Loaded');

Vue.component('ex', {
    props: ['xdata'],
    template: '<li>{{ xdata.text }}</li>'
});

var application = new Vue({ 
    el: '#app',
    data: {
        message : "Barbitruc",
        xdata: [
            {text:'ravioli'},
            {text:'calzone'},
            {text:'lasagne'}
        ]
    }
});