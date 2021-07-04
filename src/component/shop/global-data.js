const user = JSON.parse(localStorage.getItem('auth'));

export function fetchData() {
    fetch(`http://localhost:3002/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(data => {
            globalData.cartId = data.id;
        })
        .catch(err => console.log('Error ', err))
}
// globalData.cartId !== 0 ? fetchData() : null;
fetchData();
export const globalData = {
    cartId: 0,
    totalPrice: 0
}  
console.log(globalData.cartId)
