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
// SHOW / HIDE MOBILE MENU
function openMenu() {
    $('.mobile-menu_sidebar-menu').addClass("show");
    $('.nav-btn').css("opacity", 0);
}

function closeMenu() {
    $('.mobile-menu_sidebar-menu').removeClass("show")
    $('.nav-btn').css("opacity", 1);
}

// Declare api urls
var api_url = 'https://sheetdb.io/api/v1/zrh61qnmxpqjm';
// var api_url = 'https://morizone.com/products-data.json';
// GET PRODUCT BY ID  
function getProduct(proID, selector) {
    
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            
            var productSingle = `
            <div class="container row">           
            <div class="product-image col-sm-6">
            <div class="img-frame">
                <img id="${data[proID].id}" src="../${data[proID].img}" alt="${data[proID].name}">
            </div>
        </div>
        <div class="right-content col-sm-6">
            <div class="breadcrumb">
                <ul>
                    <li><a href="../index.html">Home</a>></li>
                    <li><a href="#">${data[proID].catName}</a>></li>
                    <li><a href="#">${data[proID].catName}</a>></li>
                    <li><a href="#">${data[proID].catName}</a>></li>
                    <li><a href="#">${data[proID].catName}</a></li>
                </ul>
            </div>
            <div class="product-info">
                <h1 class="price">$${data[proID].price}</h1>
                <h2 class="product-title">${data[proID].name}</h2>
                <ul class="more-info">
                    <li class="sku">SKU: <b>${data[proID].sku}</b></li>
                    <li class="category">Category: <a href="${data[proID].catSlug}">${data[proID].catName}</a></li>
                </ul>
                
                <a href="javascript:void(0)" data-id="${data[proID].id}" data-imgurl="../${data[proID].img}" data-name="${data[proID].name}" data-sku="${data[proID].sku}" data-price="${data[proID].price}" class="add-to-cart btn btn-primary">Add to
                cart</a> `;

            $(selector).html(productSingle);
            $('title').append(data[proID].name + " | Blooming Petals")
            //add to cart event
            addItem();
            displayCart();
            
        })
        .catch(err => console.log("Data Error"));
}

// GET PRODUCT BY CATEGORY 
function getProductsByCat(CatData) {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            // FILTER PRODUCTS BY CATEGORY

            function Cat(products) {
                return products.catID == CatData;
            }
            var productsList = data.filter(Cat);

            function items(pro) {

                return `<div class="col-md-4 col-6">
                <div class="card" >
                    <div class="img-wrapper">
                    <img src="${pro.img}" alt="${pro.name}"></div>
                    <div class="card-block">
                        <a href="${pro.proSlug}"><h5 class="card-title">${pro.name}</h5>
                        <div class="buy">                      
                        <p class="card-text">$${pro.price}</p>
                        <a href="javascript:void(0)"
                        data-id="${pro.id}"
                        data-imgurl="${pro.img}"
                        data-name="${pro.name}"
                        data-sku="${pro.sku}"
                        data-price="${pro.price}"
                        class="add-to-cart btn btn-primary">Add to cart</a>
                        </div>           
                    </div>
                </div>
            </div>`;
            }

            var a = productsList.map(items);
            $('#products').html(a.join(''))
            // GET CATEGORY NAME

            addItem();
            displayCart();



        })
        .catch(err => console.log("Data Error"));
};
// RENDER ALL PRODUCTS
function allProducts() {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {

            function productsArray(pro) {
                return `
            <div class="product-block col-6 col-md-4">                                           
                <div class="img-wrapper">
                <img  src="${pro.img}" alt="${pro.name}" width="300" />
                </div>
                <p>${pro.name}<p>
                <span>$${pro.price}</span> <a href="${pro.proSlug}" class="add-to-cart btn btn-primary">Add To Cart</a>
            </div>
        `;
            };
            var allProducts = data.map(productsArray)
            $('#products').html(allProducts.join(''));


        })
        .catch(err => console.log("Data Error"));
}
//FILTER PRODUCTS BY CATEGORY

function getUrl() {
    var url = window.location.href.slice(-5);
    if (url == ".html") {
        getProductsByCat('cat11')
    } else
        getProductsByCat(url);

}

//social share 
function socialComponent(selector) {
    var htmlSocial = `<div class="social-share">
    <ul class="social-icons">

        <li><a href="https://www.facebook.com/sharer/sharer.php" target="_blank"
                title="Share on Facebook"
                onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL) + '&quote=' + encodeURIComponent(document.URL)); return false;"><i
                    class="fab fa-facebook-f"></i><span class="sr-only">Share on
                    Facebook</span></a></li>
        <li><a href="https://twitter.com/intent/tweet" target="_blank" title="Tweet"
                onclick="window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(document.title) + ':%20' + encodeURIComponent(document.URL)); return false;"><i
                    class="fab fa-twitter"></i><span class="sr-only">Tweet</span></a></li>
        <li><a href="http://pinterest.com/pin/create/button/" target="_blank" title="Pin it"
                onclick="window.open('http://pinterest.com/pin/create/button/?url=' + encodeURIComponent(document.URL) + '&description=' +  encodeURIComponent(document.title)); return false;"><i
                    class="fab fa-pinterest-p"></i><span class="sr-only">Pin it</span></a>
    </ul>
</div>`;
    $(selector).html(htmlSocial);
}

function ratingGroup(selector) {
    var htmlRating = `
    <input class="rating__input rating__input--none" name="rating" id="rating-none" value="0"
    type="radio">
<label aria-label="No rating" class="rating__label" for="rating-none"><i
        class="rating__icon rating__icon--none fa fa-ban"></i></label>
<label aria-label="1 star" class="rating__label" for="rating-1"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-1" value="1" type="radio">
<label aria-label="2 stars" class="rating__label" for="rating-2"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-2" value="2" type="radio">
<label aria-label="3 stars" class="rating__label" for="rating-3"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-3" value="3" type="radio" checked>
<label aria-label="4 stars" class="rating__label" for="rating-4"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-4" value="4" type="radio">
<label aria-label="5 stars" class="rating__label" for="rating-5"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-5" value="5" type="radio">
    `;
    $(selector).html(htmlRating);
}

// ADD TO CART
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(id, img, name, sku, price, count) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (id, img, name, sku, price, count) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count++;
                saveCart();
                return;
            }
        }
        var item = new Item(id, img, name, sku, price, count);
        cart.push(item);
        saveCart();
    }
    // Set count from item
    obj.setCountForItem = function (id, count) {
        for (var i in cart) {
            if (cart[i].id === id) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
        for (var item in cart) {
            if (cart[item].id === id) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function () {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function () {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }

        return totalCount;
    }

    // Total cart
    obj.totalCart = function () {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function () {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(0);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
function addItem() {
    $('.add-to-cart').click(function (event) {
        event.preventDefault();
        var img = $(this).data('imgurl'),
            name = $(this).data('name'),
            id = $(this).data('id'),
            sku = $(this).data('sku'),
            price = Number($(this).data('price'));
        shoppingCart.addItemToCart(id, img, name, sku, price, 1);
        displayCart();

    });
}

// Clear items
$('.clear-cart').click(function () {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr  class='incart-itemts'>" +
            "<td class='img-frame'><img src='" + cartArray[i].img + "' ></td>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>SKU: " + cartArray[i].sku + "</td>" +
            "<td>$" + cartArray[i].price + "</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>-</button>" +
            "<input type='number' class='item-count form-control' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>" +
            "<button data-id='" + cartArray[i].id + "' class='plus-item btn btn-primary input-group-addon' value='" + cartArray[i].count + "' >+</button></div></td>" +
            "<td><button data-id='" + cartArray[i].id + "' class='delete-item btn btn-danger' value='" + cartArray[i].count + "' >X</button></td>" +
            " = " +
            "<td>$" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
    // var name = $(this).data('name')
    var id = $(this).data('id');
    shoppingCart.removeItemFromCartAll(id);
    displayCart();
})

// -1

$('.show-cart').on("click", ".minus-item", function (event) {
    // var name = $(this).data('name')
    var id = $(this).data('id');
    shoppingCart.removeItemFromCart(id);
    displayCart();
})

// +1

$('.show-cart').on("click", ".plus-item", function (event) {
    // var name = $(this).data('name')
    var id = $(this).data('id');
    shoppingCart.addItemToCart(id);
    displayCart();
})

// Item count input

$('.show-cart').on("change", ".item-count", function (event) {
    // var name = $(this).data('name');
    var id = $(this).data('id');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(id, count);
    displayCart();
});

displayCart();

//add modal content

function modal() {
    var htmlModel = `
    <div class="modal fade" id="cart" tabindex="-1" role="dialog" aria-labelledby="ModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
       <div class="modal-content">
           <div class="modal-header">
               <h5 class="modal-title" id="ModalLabel">Cart</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
               </button>
           </div>
           <div class="modal-body">
               <table class="show-cart table">
    
               </table>
               <div>Total price: $<span class="total-cart"></span></div>
           </div>
           <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary">Order now</button>
           </div>
       </div>
    </div>
    </div>`;
    $('#modal-content-js').html(htmlModel);
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr  class='incart-itemts'>" +
            "<td class='img-frame'><img src='" + cartArray[i].img + "' ></td>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>SKU: " + cartArray[i].sku + "</td>" +
            "<td>$" + cartArray[i].price + "</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>-</button>" +
            "<input type='number' class='item-count form-control' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>" +
            "<button data-id='" + cartArray[i].id + "' class='plus-item btn btn-primary input-group-addon' value='" + cartArray[i].count + "' >+</button></div></td>" +
            "<td><button data-id='" + cartArray[i].id + "' class='delete-item btn btn-danger' value='" + cartArray[i].count + "' >X</button></td>" +
            " = " +
            "<td>$" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

 //form

const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
const contactForm = document.getElementById('contact-form');
const errorElement = document.getElementById('error');
const successMsg = document.getElementById('success-msg');
const submitBtn = document.getElementById('submit');
  
const validate = (e) => {
  e.preventDefault();
 
  if (name.value.length < 3) {
    errorElement.innerHTML = 'Your name should be at least 3 characters long.';
    return false;
  } 
  
  if (!(email.value.includes('.') && (email.value.includes('@')))) {
    errorElement.innerHTML = 'Please enter a valid email address.';
    return false;
  } 

  if (!emailIsValid(email.value)) {
    errorElement.innerHTML = 'Please enter a valid email address.';
    return false;
  }

  if (message.value.length < 15) {
    errorElement.innerHTML = 'Please write a longer message.';
    return false;
  }

  errorElement.innerHTML = '';
  successMsg.innerHTML = 'Thank you! I will get back to you as soon as possible.'; 

  e.preventDefault();
  setTimeout(function () {
    successMsg.innerHTML = '';
    document.getElementById('contact-form').reset();
  }, 6000);

  return true;

}

const emailIsValid = email => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// submitBtn.addEventListener('click', validate);