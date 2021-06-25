// $( document ).ready(function() {
//     console.log( "ready!" );
// });

/* ScrollTop Button */
$(document).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#to-top-btn').show()
    } else $('#to-top-btn').hide()
});
