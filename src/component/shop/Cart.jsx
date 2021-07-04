import React, { useEffect, useState } from 'react';
import Button from './Button';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'
import './Cart.css';
import { globalData } from './global-data';

export default function Cart(props) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState();

    const { date, setDate } = props;

    const{cartId} = globalData;
    

    useEffect(() => {
        if (cartId > 0) {
            fetch(`http://localhost:3002/cartItem/${cartId}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => alert(err))

            fetch(` http://localhost:3002/toatlAmount/${cartId}`)
                .then(res => res.json())
                .then(data => {
                    setTotal(data);
                    globalData.totalPrice = data
                })
                .catch(err => alert(err))
        }
    }, [date, cartId])

    function deleteBusket() {
        fetch(`http://localhost:3002/cart`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId })
        })
            .then(res => { res.json() })
            .then(() => {
                setDate(new Date())
            })
            .catch(err => alert(err))
    }

    return (
        <div>
            <Nav
                className="col-md-13 d-none d-md-block bg-light sidebar">
                <h3>העגלה שלי</h3>
                {data.length > 0 && <span className="delete-basket">
                    <button onClick={deleteBusket}>רוקן סל</button>
                </span>}
                <hr />
                {data.length === 0 && <p>העגלה שלך ריקה</p>}
                <div className="sidebar-sticky"></div>

                {data.map(item => {
                    return (
                        <div className="cart-content" key={item.item.id}>
                            <p >{item.item.name}</p>
                            <Button item={item.item} defaultValue={item.amount} setDate={setDate} cartId={cartId} caller='cart' />
                        </div>
                    )
                })}
                {data.length > 0 && < p style={{ marginBottom: '2px' }}>₪ {total} מחיר סופי </p>}
                {data.length > 0 && <Link to="/order">הזמן</Link>}
            </Nav>
        </div >
    )
}