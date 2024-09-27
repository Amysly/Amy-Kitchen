export let cartItems = JSON.parse(localStorage.getItem('cartItems'))||[

];


export function addToAdd(productId) {
    const matchingItem = cartItems.find(cartItem => cartItem.productId === productId);

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cartItems.push({
            productId: productId,
            quantity: 1
        });
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
   
}



export function removeItemFromLocalStorage() {

    localStorage.removeItem('cartItems');
    
}




