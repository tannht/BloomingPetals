// $( document ).ready(function() {
//     console.log( "ready!" );
// });



$(window).scroll(function () {
    var scrollHeight = $(window).scrollTop();
    /* change Navbar style when scroll */
    if (scrollHeight > 0) {
        $('.navibar').addClass("scroll");
        $('#navmobie').addClass("scrolldown");
    } else {
        $('.navibar').removeClass("scroll");
        $('#navmobie').removeClass("scrolldown")
    };

    /* ScrollTop Button */
    if (scrollHeight > 500) {
        $('#to-top-btn').show();
    } else $('#to-top-btn').hide();
});
// define Header
function includeHeader() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-header");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-header");
                    includeHeader();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHeader();
// define Footer
function includeFooter() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("include-footer");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("include-footer");
                    includeFooter();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeFooter();
// Declare api urls
var api_ulr = 'statics/js/products-data.json';

// GET PRODUCT BY ID  
function getProduct(proID) {
    fetch(api_ulr)
        .then(response => response.json())
        .then(productData => {
            var productSingle = `            
                <h1>${productData[proID].name}</h1>
                <p>${productData[proID].price}</p>
                <p>${productData[proID].img}</p>
                <p>${productData[proID].catName}</p>
                <p>${productData[proID].sku}</p>
                <p>${productData[proID].desc}</p>
                <p>${productData[proID].catSlug}</p>
                <p>${productData[proID].proSlug}</p> `;
            $('#product').html(productSingle);
            $('title').append(productData[proID].name + " | Blooming Petals")
        })
        .catch(err => console.log("Data Error"));
}
// RENDER ALL PRODUCTS
fetch(api_ulr)
    .then(response => response.json())
    .then(productData => {


        function productsArray(pro) {
            return `
        <div class="product-block col-6 col-md-3">
                        <a href="${pro.proSlug}">                    
                            <div class="img-wrapper">
                            <img src="/${pro.img}" alt="${pro.name}" />
                            </div>
                        <p>${pro.name}<p>
                        <span>$${pro.price}</span></a>
                        </div>
        `;
        };
        var allProducts = productData.map(productsArray)
        $('#all-products').html(allProducts.join(''));


    })
    .catch(err => console.log("Data Error"));