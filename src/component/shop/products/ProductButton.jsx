import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import './ProductButton.css';
import { domain } from '../../../config';

export default function ProductButton(props) {
    const [disableAddBtn, setDisableAddBtn] = useState(false);
    const { defaultValue, item, cartId, setDate, parent } = props;

    function addProduct(item) {
        fetch(`${domain}/cartItem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(() => { setDate(new Date()); setDisableAddBtn(false); })
            .catch(err => alert(err))
    }

    function changeProductAmount(item) {
        fetch(`${domain}/cartItem`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(() => { setDate(new Date()) })
            .catch(err => alert(err))
    }

    function removeProduct(itemId) {
        fetch(`${domain}/cartItem`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(itemId)
        })
            .then(() => { setDate(new Date()) })
            .catch(err => alert(err))
    }

    return (
        <div className="product-button-div">
            {
                parent === 'cart' &&
                <button className="product-button-delete" onClick={() => removeProduct({ itemId: item.id })}>
                    <i className="trash alternate icon"></i>
                </button>
            }

            <button className="product-button" disabled={defaultValue === 0} onClick={() => {
                if (defaultValue === 1) {
                    removeProduct({ itemId: item.id })
                }
                else {
                    changeProductAmount({ itemId: item.id, amount: defaultValue - 1, generalPrice: (defaultValue - 1) * item.price, cartId })
                }
            }} >
                <RemoveIcon fontSize="small" />
            </button>
            <input type="text" disabled key={defaultValue} min="0" value={defaultValue} style={{ width: '30px', textAlign: 'center', border: '0px' }} />

            <button disabled={disableAddBtn} className="product-button" onClick={() => {
                if ('itemCarts' in item && item.itemCarts.length === 0) {
                    setDisableAddBtn(true);
                    addProduct({ itemId: item.id, amount: 1, generalPrice: item.price, cartId })
                }
                else {
                    changeProductAmount({ itemId: item.id, amount: defaultValue + 1, generalPrice: (defaultValue + 1) * item.price, cartId })
                }
            }}>
                <AddIcon fontSize="small" />
            </button>
        </div>
    )
}