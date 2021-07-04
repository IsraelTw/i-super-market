import React from 'react'

export default function bbutton(props, e) {
    console.log(arguments)
    const { defaultValue, item, cartId, setDate, caller } = props;

    function addProduct(item) {
        fetch(`http://localhost:3002/cartItem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .catch(err => alert(err))
    }

    function changeProductAmount(item) {
        fetch(`http://localhost:3002/cartItem`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .catch(err => alert(err))
    }

    function removeProduct(itemId) {
        fetch(`http://localhost:3002/cartItem`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemId)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // setTimeout(() => {
                setDate(new Date())
                // }, 100)
            })
            .catch(err => alert(err))
    }

    return (
        <div>
            <button disabled={defaultValue === 0} onClick={() => {
                if (defaultValue === 1) {
                    removeProduct({ itemId: item.id })
                }
                else {
                    changeProductAmount({ itemId: item.id, amount: defaultValue - 1, generalPrice: (defaultValue - 1) * item.price, cartId })
                }
                setTimeout(() => {
                    setDate(new Date())
                }, 100)
            }} style={{ border: "none" }}>-</button>
            <input type="text" disabled key={defaultValue} min="0" value={defaultValue} style={{ width: '30px', textAlign: 'center', border: '0px' }} />

            <button onClick={() => {
                if ('itemCarts' in item && item.itemCarts.length === 0) {
                    addProduct({ itemId: item.id, amount: 1, generalPrice: item.price, cartId })
                }
                else {
                    changeProductAmount({ itemId: item.id, amount: defaultValue + 1, generalPrice: (defaultValue + 1) * item.price, cartId })
                }
                setTimeout(() => {
                    setDate(new Date())
                }, 100)
            }} style={{ border: "none", color: "none", size: "20px" }}>
                +
            </button>
            {caller === 'cart' && <button onClick={() => removeProduct({ itemId: item.id })}>x</button>}
        </div>
    )
}