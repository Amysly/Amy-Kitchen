export let cartItems = [];


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
}
