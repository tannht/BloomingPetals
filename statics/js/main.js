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

function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
// Declare api urls
var api_url = 'https://script.google.com/macros/s/AKfycbzREWIKw-FELGuiFFmfRh4T0RRqbDfPjBbKhcT6rsGatjogUUVAysDKjsW5B6XeT5zW0A/exec';

function getProduct(proID, selector) {

    fetch(api_url)
        .then(response => response.json())
        .then(res => {
            var data = Object.values(res.user)

            var productSingle = `
            <div class="container row">           
            <div class="product-image col-sm">
            
            <img id="${data[proID].id}" src="../${data[proID].img}" alt="${data[proID].name}">
            
        </div>
        <div class="right-content col-sm">
            <div class="breadcrumb_mod">
                <ul>
                    <li><a href="../index.html">Home</a>
                    <i class="fa fa-angle-right"></i>
                    </li>
                    <li><a href="${data[proID].catSlug}">${data[proID].catName}</a>
                    <i class="fa fa-angle-right"></i>
                    </li>                    
                    <li>${data[proID].name}</li>
                </ul>
            </div>
            <div class="product-info">
                <h1 class="price">$${data[proID].price}</h1>
                <h2 class="product-title">${data[proID].name}</h2>
                <div class="rating-group">
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>              
                <i class="fa fa-star-half"></i>
                (<span>${getRandomInt(10, 50)} reviews</span>)
                </div>
        
                <ul class="more-info">
                    <li class="sku">SKU: <b>${data[proID].sku}</b></li>
                    <li class="category">Category: <a href="${data[proID].catSlug}">${data[proID].catName}</a></li>
                </ul>
                
                <a href="javascript:void(0)" data-id="${data[proID].id}" data-imgurl="../${data[proID].img}" data-name="${data[proID].name}" data-sku="${data[proID].sku}" data-price="${data[proID].price}" class="add-to-cart btn btn-primary">Add to
                cart</a> 
                <div class="social-share"></div>
                `;
            var downloadPdf = `
                    <center>
                        <p>You can download product's brochure here<p>
                        <a href="../${data[proID].download}" target="_blank"><i class="fa fa-download"></i> Download Brochure</a>
                    </center>
            `;

            $(selector).html(productSingle);
            $(".download").html(downloadPdf)
            $('title').append(data[proID].name + " | Blooming Petals")
            //add to cart event
            addItem();
            displayCart();
            socialComponent('.social-share');

        })
        .catch(err => console.log("Data Error"));
}

function renderproduct() {
    var Id = $('#product-container').data('id');
    $('#product-container').html(getProduct(Id, '#product-container'));
}
renderproduct();



function getInfo() {
    var fullName = $('input#fullname').val(),
        email = $('input#email').val(),
        vote = $('input[name="star"]:checked').val(),
        comment = $('textarea#comment').val();
    // console.log(vote)
    var voteArray = {
        fullName: fullName,
        email: email,
        vote: vote,
        commnet: comment,
    }


    var render = `
        <h1>Thanks for your vote!</h1>    
        <p>Hi, <strong>${voteArray.fullName}</strong></p>
        <p>You voted: <b>${voteArray.vote} star</b> </p>
        <p>Your comment: <b>${voteArray.commnet} </b></p>
        <p>We will moderate and show your review on our website soon!</p> 
        `;

    $('.formblock').html(render)
}




function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}



// GET PRODUCT BY CATEGORY 
function getProductsByCat(CatData) {
    fetch(api_url)
        .then(response => response.json())
        .then(res => {
            var data = Object.values(res.user)

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
                        data-id="${pro.key}"
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
            addItem();
            displayCart();
        })
        .catch(err => console.log("Data Error"));
};









//GET RANDOM PRODUCTS
fetch(api_url)
    .then(response => response.json())
    .then(res => {
        var data = Object.values(res.user)
        //lasted product
        var lastedList = getRandom(data, 4);
        // data.slice(-4)


        //random array
        function getRandom(arr, n) {
            var result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;

        }
        var randomArray = getRandom(data, 4);

        function items(pro) {

            return `<div class="col-md-3 col-6">
            <div class="card" >
                <div class="img-wrapper">
                <img src="${pro.img}" alt="${pro.name}"></div>
                <div class="card-block">
                    <a href="${pro.proSlug}"><h5 class="card-title">${pro.name}</h5>
                    <div class="buy">                      
                    <p class="card-text">$${pro.price}</p>
                    <a href="javascript:void(0)"
                    data-id="${pro.key}"
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

        function latest(lastpro) {

            return `<div class="col-md-3 col-6">
            <div class="card" >
                <div class="img-wrapper">
                <img src="${lastpro.img}" alt="${lastpro.name}"></div>
                <div class="card-block">
                    <a href="${lastpro.proSlug}"><h5 class="card-title">${lastpro.name}</h5>
                    <div class="buy">                      
                    <p class="card-text">$${lastpro.price}</p>
                    <a href="javascript:void(0)"
                    data-id="${lastpro.key}"
                    data-imgurl="${lastpro.img}"
                    data-name="${lastpro.name}"
                    data-sku="${lastpro.sku}"
                    data-price="${lastpro.price}"
                    class="add-to-cart btn btn-primary">Add to cart</a>
                    </div>           
                </div>
            </div>
        </div>`;
        }
        var r = randomArray.map(items);
        $('#popular-products').html(r.join(''))
        var l = lastedList.map(latest);
        $('#lastest-products').html(l.join(''))
        addItem();
        displayCart();
    })
    .catch(err => console.log("Data Error"));



// --------------------------- //
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
<input class="rating__input" name="rating" id="rating-3" value="3" type="radio" >
<label aria-label="4 stars" class="rating__label" for="rating-4"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-4" value="4" type="radio">
<label aria-label="5 stars" class="rating__label" for="rating-5"><i
        class="rating__icon rating__icon--star fa fa-star"></i></label>
<input class="rating__input" name="rating" id="rating-5" value="5" type="radio" checked>
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
    $('.total-cart').html(addCommas(shoppingCart.totalCart()));
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
                <a href="../checkout.html" class="btn btn-primary">Check Out</a>
            </div>
        </div>
        </div>
        </div>`;
    $('#modal-content-js').html(htmlModel);
}
var cartArray = shoppingCart.listCart();
var output = "";
for (var i in cartArray) {

    output += "<tr  class='incart-itemts'>" +
        "<td class='img-frame'><img src='" + cartArray[i].img + "' ></td>" +
        "<td><ul>" + "<li>" + cartArray[i].name + "</li>" +
        +"<li>SKU: " + cartArray[i].sku + "</li>" + "</ul></td>" +
        "<td>$" + cartArray[i].price + "</td>" +
        "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>-</button>" +
        "<input type='number' class='item-count form-control' data-id='" + cartArray[i].id + "' value='" + cartArray[i].count + "'>" +
        "<button data-id='" + cartArray[i].id + "' class='plus-item btn btn-primary input-group-addon' value='" + cartArray[i].count + "' >+</button></div></td>" +
        "<td><button data-id='" + cartArray[i].id + "' class='delete-item btn btn-danger' value='" + cartArray[i].count + "' >X</button></td>" +
        " = " +
        `<td>$${addCommas(cartArray[i].total)}</td>` +
        "</tr>";
}
if (shoppingCart.totalCount() > 0) {

    $('.show-cart').html(output);
    $('.total-cart').html(addCommas(shoppingCart.totalCart()));
    $('.total-count').html(shoppingCart.totalCount());
    $('.total-price').html(`<b>$${addCommas(shoppingCart.totalCart())}</b>`);

} else {
    var msg = `<div class="msg"><h1>Your Cart Empty</h1><a href="all-products.html"><i class="fa fa-arrow-circle-left"></i> Continue Shopping</a></div>`
    $('.show-cart').html(`<h1 class="msg"> Your Cart Empty</h1>`);
    $('#checkout-form').html(msg);
}


//CHECK OUT PRODUCT LIST
function getCheckOutList() {
    function cartList(pro) {
        {
            return `<tr class="cart-item">
            <td class="product-name">
                ${pro.name}
                <span><strong class="product-quantity">
                    x${pro.count}
                </strong></span>
            </td>
            <td class="product-total">
                <span>$${addCommas(pro.total)}</span>
            </td>
            </tr>`;
        }
    }
    var results = cartArray.map(cartList);
    $('.items').html(results)
}
getCheckOutList();

//product-detail-tabs
var $wrapper = $('.tab-wrapper'),
    $allTabs = $wrapper.find('.tab-content > div'),
    $tabMenu = $wrapper.find('.tab-menu li'),
    $line = $('<div class="line"></div>').appendTo($tabMenu);

$allTabs.not(':first-of-type').hide();
$tabMenu.filter(':first-of-type').find(':first').width('100%')

$tabMenu.each(function (i) {
    $(this).attr('data-tab', 'tab' + i);
});

$allTabs.each(function (i) {
    $(this).attr('data-tab', 'tab' + i);
});

$tabMenu.on('click', function () {

    var dataTab = $(this).data('tab'),
        $getWrapper = $(this).closest($wrapper);

    $getWrapper.find($tabMenu).removeClass('active');
    $(this).addClass('active');

    $getWrapper.find('.line').width(0);
    $(this).find($line).animate({
        'width': '100%'
    }, 'fast');
    $getWrapper.find($allTabs).hide();
    $getWrapper.find($allTabs).filter('[data-tab=' + dataTab + ']').show();
});


//TESTIMONIALS
//RENDER TESTIMONIALS 
function customers(name, avartar, comment) {
    this.name = name
    this.avartar = avartar
    this.comment = comment
}
var CustomerData = [
    new customers(
        "Sheppard I.",
        "https://www.coolgenerator.com/Pic/Face//female/female20161025795220154.jpg",
        "Flowers was worth a fortune to my company. Flowers is the real deal!"
    ),
    new customers(
        "Diego X.",
        "https://www.coolgenerator.com/Pic/Face//male/male20161083813562042.jpg",
        "This is simply unbelievable! Florist was worth a fortune to my company. It's really wonderful."
    ),
    new customers(
        "Emilia Q.",
        "https://www.coolgenerator.com/Pic/Face//female/female1021850105805.jpg",
        "It really saves me time and effort. florist is exactly what our business has been lacking. I will refer everyone I know."
    ),
    new customers(
        "Arden R.",
        "https://www.coolgenerator.com/Pic/Face//male/male20161086449342255.jpg",
        "If you aren't sure, always go for floral. This is simply unbelievable! This is simply unbelievable!"
    ),
    new customers(
        "Mellicent P.",
        "https://i.pravatar.cc/150?img=41",
        "No matter where you go, florist is the coolest, most happening thing around! It really saves me time and effort."
    )
]

function getComments() {

    function comments(cus) {
        return `<div class="item show ">
        <div class="card border-0 py-3 px-4">
          <div class="row justify-content-center"> 
          <img src=\"${cus.avartar}\" class="img-fluid profile-pic mb-4 mt-3"></div>
          <h6 class="mb-3 mt-2">${cus.name}</h6>
          <p class="content mb-5 mx-2">"${cus.comment}"</p>
        </div>
      </div>`;
    }
    var results = CustomerData.map(comments);

    $('.owl-carousel').html(results)

    $('.owl-prev').click(function () {
        $active = $('.owl-item .item.show');
        $('.owl-item .item.show').removeClass('show');
        $('.owl-item .item').removeClass('next');
        $('.owl-item .item').removeClass('prev');
        $active.addClass('next');
        if ($active.is('.first')) {
            $('.owl-item .last').addClass('show');
            $('.first').addClass('next');
            $('.owl-item .last').parent().prev().children('.item').addClass('prev');
        } else {
            $active.parent().prev().children('.item').addClass('show');
            if ($active.parent().prev().children('.item').is('.first')) {
                $('.owl-item .last').addClass('prev');
            } else {
                $('.owl-item .show').parent().prev().children('.item').addClass('prev');
            }
        }
    });

    $('.owl-next').click(function () {
        $active = $('.owl-item .item.show');
        $('.owl-item .item.show').removeClass('show');
        $('.owl-item .item').removeClass('next');
        $('.owl-item .item').removeClass('prev');
        $active.addClass('prev');
        if ($active.is('.last')) {
            $('.owl-item .first').addClass('show');
            $('.owl-item .first').parent().next().children('.item').addClass('prev');
        } else {
            $active.parent().next().children('.item').addClass('show');
            if ($active.parent().next().children('.item').is('.last')) {
                $('.owl-item .first').addClass('next');
            } else {
                $('.owl-item .show').parent().next().children('.item').addClass('next');
            }
        }
    });



}
getComments();


$('.owl-carousel').owlCarousel({
    mouseDrag: false,
    loop: true,
    margin: 2,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 3
        }
    }
});

// loading effect
// selecting loading div


// showing loading
function displayLoading() {
    $('#loading-bg').addClass("display");
    // to stop loading after some time
    setTimeout(() => {
        $('#loading-bg').removeClass("display");
    }, 2000);
}
// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}
