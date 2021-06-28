// $( document ).ready(function() {
//     console.log( "ready!" );
// });

/* ScrollTop Button */
$(document).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#to-top-btn').show()
    } else $('#to-top-btn').hide();

});
$(window).scroll(function () {
    var scrollHeight = $(window).scrollTop();

    if (scrollHeight > 0) {
        $('.navibar').addClass("scroll");
    } else $('.navibar').removeClass("scroll");
});

//Add JSON file

var api_ulr = '../statics/js/products-data.json'
fetch(api_ulr)
    .then(response => response.json())
    .then(function(product) {
        // var popularProducts = product.map( function(product){
        //     console.log(product.name)
        //     return ;
        // });
        
    })
    .catch(err => console.log("Data Error"))