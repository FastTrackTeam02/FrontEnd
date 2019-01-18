

$(document).ready(function(){

$(".test").click(function(e) {
    alert('clicked!');
});


$("p").on('click',(function(e) {
    alert('p clicked!');
}));

});
