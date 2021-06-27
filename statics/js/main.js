// $( document ).ready(function() {
//     console.log( "ready!" );
// });

/* ScrollTop Button */
$(document).scroll(function () {
    if ($(this).scrollTop() > 500) {
        $('#to-top-btn').show()
    } else $('#to-top-btn').hide();
    
});
$(window).scroll(function() {    
    var scrollHeight = $(window).scrollTop();
    
    if (scrollHeight > 0) {
        $('.navibar').addClass("scroll");
    } else $('.navibar').removeClass("scroll");
});

//Add JSON file
var api_ulr = '../statics/js/products-data.json'
var productsArray = fetch(api_ulr)
  .then(response => response.json())
  .then(function(productsList) {
    //GET DATA FORM PRODUCTS ARRAY
    productsList.map(function(product){

        var productName = product.name
        var categoryName = product.catName
        var productPrice = product.price
        var productDesc = product.desc
        $("#popular-product").innerHTML = '<div>${productName}</div>'
    })
    
  })
  .catch(err => setTimeout(console.log("Data Error"),5000))
 
