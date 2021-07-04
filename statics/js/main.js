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
var api_ulr = '/statics/js/products-data.json';

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
// GET PRODUCT BY CATEGORY 
function getProductsByCat(CatData) {
    fetch(api_ulr)
        .then(response => response.json())
        .then(productData => {
            // FILTER PRODUCTS BY CATEGORY

            function Cat(products) {
                return products.catID == CatData;
            }
            var productsList = productData.filter(Cat);

            function items(pro) {

                return `<div class="product-block col-6 col-md-4">
                    <a href="${pro.proSlug}">                    
                        <div class="img-wrapper">
                        <img src="/${pro.img}" alt="${pro.name}" />
                        </div>
                    <p>${pro.name}<p>
                    <span>$${pro.price}</span></a>
                    <main class="cd-main ">
    <div class="text-component text-center">
      
      <p class="flex flex-wrap flex-center ">       
        <a href="javascript:void(0)" class="cd-add-to-cart js-cd-add-to-cart" data-price="${pro.price}">Add To Cart</a>
      </p>
    </div>
  </main>
                    </div>`;
            }

            var a = productsList.map(items);
            $('#products').html(a.join(''))
            // GET CATEGORY NAME            
            
            console.log($("title").text())
            
            var title = $("title").text(),               
                newTitle = $("title").replace(title, productsList[1].catName + " Category | Blooming Petals")
               
        })
        .catch(err => console.log("Data Error"));
};
// RENDER ALL PRODUCTS
function allProducts() {
    fetch(api_ulr)
        .then(response => response.json())
        .then(productData => {


            function productsArray(pro) {
                return `
        <div class="product-block col-6 col-md-4">
                        <a href="${pro.proSlug}">                    
                            <div class="img-wrapper">
                            <img src="/${pro.img}" alt="${pro.name}" width="300" />
                            </div>
                        <p>${pro.name}<p>
                        <span>$${pro.price}</span></a>
                        </div>
        `;
            };
            var allProducts = productData.map(productsArray)
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

// ADD TO CART
// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count) {
      this.name = name;
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
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
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
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  //social share 
  