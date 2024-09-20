import { products } from './product.js';
import { cartItems, addToAdd} from './cart.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchMenu = document.getElementById('search-menu');
    const cartMessage = document.querySelector('.cart-message');
    const productContainer = document.querySelector('.js-product-item');

    if (!searchMenu || !cartMessage || !productContainer) {
        console.error('Required DOM elements are missing.');
        return;
    }

    searchMenu.addEventListener('keyup', (e) => {
        const searchText = e.target.value.toLowerCase();
        const menuLists = document.querySelectorAll('.food-items');

        menuLists.forEach((menuList) => {
            const searchItem = menuList.textContent.toLowerCase();
            menuList.style.display = searchItem.includes(searchText) ? 'block' : 'none';
            if (searchItem.includes(searchText)) {
                menuList.style.width = '400px';
            }
        });
    });

    let allProducts = '';

    products.forEach((product) => {
        let productSummary = `
            <div class="food-items">
                <img src="${product.image}" alt="${product.name}">
                <div class="details">
                    <div class="details-sub">
                        <h5>${product.name}</h5>
                        <h5 class="price">${product.price}</h5>
                    </div>
                    <p>Freshly made burger with fries</p>
                    <button class="add-to-cart" data-product="${product.id}">Add To Cart</button>
                </div>
            </div>
        `;
        allProducts += productSummary;
    });
    
    productContainer.innerHTML = allProducts;
  
    function productCartItems() {
        let totalCartItem = 0;
        let AllCartItem = `<img src="images/closemenu.png" class="close-icon"/>
                         <h3 class="cart-heading">Cart Items</h3>
                    
        `; 
    
        cartItems.forEach((cartItem) => {
            const productId = cartItem.productId;
          
            let matchingProduct = products.find(product => product.id === productId);
            if (matchingProduct) {
                // Calculate the total price for the current item based on its quantity
                const itemTotalPrice = matchingProduct.price * cartItem.quantity;
                totalCartItem += itemTotalPrice;
    
                let cartThings = `
                    <div style="border: 1px solid gray; padding: 10px;" class="cart-border">
                        <div class="price-item">
                            <div>
                                <h4>${matchingProduct.name}</h4>
                                <img src="${matchingProduct.image}" style="width:100px;">
                            </div>
                            <div style="vertical-align: bottom;">
                                <h4 class="price"><strong>Price:</strong> ${itemTotalPrice}</h4>
                                <button class="subtract-button" data-product-id="${productId}">-</button>
                                <button class="item-quantity">${cartItem.quantity}</button>
                                <button class="add-button" data-product-id="${productId}">+</button>
                                <div><i class="fa-solid fa-trash-can delete-can"data-product-id="${productId}"></i></div>
                            </div>
                        </div>
                    </div>
                `;
                AllCartItem += cartThings;
            }
        });
    
        AllCartItem += `
            <h4 style="float:left; margin-bottom:-20px;" class="totalcartItem">TOTAL: ${totalCartItem}</h4>
            <button class="btn-order">CLEAR CART</button>
            
        `;
        
        const cartItemsContainer = document.querySelector('.second-con');
        cartItemsContainer.innerHTML = AllCartItem;
        allQuantityBtn();
        removeCartItems();
        clearCart()
    }


    function clearCart() {
        const cartClear = document.querySelector('.btn-order');
        cartClear.addEventListener('click', function () {
            const totalCartItem = document.querySelector('.totalcartItem');
            const cartHeading = document.querySelector('.cart-heading');
            const priceLists = document.querySelectorAll('.cart-border');
    
            // Remove each cart item from the DOM
            priceLists.forEach(function (priceList) {
                priceList.remove();
            });
    
            // Update the total and heading once all items are cleared
            totalCartItem.style.display = "none";
            cartHeading.innerHTML = "Cart is Empty";
            cartHeading.style.textAlign = "center";
            cartClear.style.display = "none";
    
            // Clear the cart data
            cartItems.length = 0;
    
            // Update the cart quantity display after clearing the cart
            updateCartQuantityDisplay();  // Call this after clearing the cart
        });
    }
    
    

    function removeCartItems() {
        const trashCans = document.querySelectorAll('.delete-can');
        
        trashCans.forEach(function (trashCan) {
            trashCan.addEventListener('click', function (e) {
                const cartItemElement = e.target.closest('.cart-border'); // Get the specific item container
                const productId = e.target.dataset.productId; // Get the product ID
        
                // Find the index of the item in the cartItems array
                const itemIndex = cartItems.findIndex(item => item.productId === productId);
        
                if (itemIndex !== -1) {
                    cartItems.splice(itemIndex, 1); // Remove the item from the cartItems array
                }
        
                // Remove the item from the DOM
                if (cartItemElement) {
                    cartItemElement.remove();
                }
        
                // Display a message
                displayMessage('Item has been removed from the cart');
        
                // Update the total quantity and display
                updateCartQuantityDisplay();
        
                // Call productCartItems() to recalculate and update the cart
                productCartItems();
                updateUI()
            });
        });
    }
    
    function updateUI() {

        if (cartItems.length === 0) {
            const totalCartItem = document.querySelector('.totalcartItem');
            const cartHeading = document.querySelector('.cart-heading');
            const cartClear = document.querySelector('.btn-order');

            if (totalCartItem) totalCartItem.style.display = "none"; // Safeguard if totalCartItem exists
            if (cartHeading) {
                cartHeading.innerHTML = "Cart is Empty";
                cartHeading.style.textAlign = "center";
            }
            if (cartClear) cartClear.style.display = "none"; // Hide clear cart button if cart is empty
        }

    }
    
    
    function allQuantityBtn() {

            let subtractBtn = document.querySelectorAll('.subtract-button');
            subtractBtn.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-product-id');
                    const cartItem = cartItems.find(item => item.productId === productId);
                    if (cartItem.quantity > 1) {
                        cartItem.quantity --;
                        productCartItems()
                        displayMessage('Item has been reduced from the cart');
                    } 
                    updateCartQuantityDisplay();
                });
            });

            let addBtn = document.querySelectorAll('.add-button');
            addBtn.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const productId = btn.getAttribute('data-product-id');
                    const cartItem = cartItems.find(item => item.productId === productId);
                        cartItem.quantity ++;
                        productCartItems()
                        updateCartQuantityDisplay();
                    
                    
                
                });
            });
    
    
        
    }
    productCartItems()
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.product;
            addToAdd(productId)
            productCartItems()
            updateCartQuantityDisplay()
        });
    });
    
    function updateCartQuantityDisplay() {
        const cartQuantityElement = document.querySelector('.cart-quantity');
    
        let cartQuantity= 0;
    
        cartItems.forEach(function (cartItem) {
            cartQuantity += cartItem.quantity;
        });
    
        cartQuantityElement.innerHTML = cartQuantity;

        displayMessage('Item has been added to the cart');
    }
    
    function displayMessage(message) {
        cartMessage.innerHTML = message;
        cartMessage.style.backgroundColor = 'black';
    
        setTimeout(() => {
            cartMessage.innerHTML = '';
            cartMessage.style.backgroundColor = '';
        }, 3000);
    }

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('close-icon')) {
            let cartItemsModal = document.querySelector('.second-con');
            cartItemsModal.style.display = "none";
        }
    });
    
    
    let cartItemsModal = document.querySelector('.second-con');
    let cartQuantityItems = document.querySelector('.cart-quantity');
    
    cartQuantityItems.addEventListener('click', function () {
        cartItemsModal.style.display = 'block';
    
        // Select totalCartItem, cartHeading, and cartClear elements
        let totalCartItem = document.querySelector('.totalcartItem');
        let cartHeading = document.querySelector('.cart-heading');
        let cartClear = document.querySelector('.btn-order');
    
        // Check if the cart is empty
        if (cartItems.length === 0) {
            if (totalCartItem) totalCartItem.style.display = "none"; // Safeguard if totalCartItem exists
            if (cartHeading) {
                cartHeading.innerHTML = "Cart is Empty";
                cartHeading.style.textAlign = "center";
            }
            if (cartClear) cartClear.style.display = "none"; // Hide clear cart button if cart is empty
        }
    });
    

});
