import React, { useEffect, useState } from 'react';
import ProductButton from '../products/ProductButton';
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './Cart.css';
import { globalData } from '../global-data';
import AddProduct from '../../admin/AddProduct';
import EditProduct from '../../admin/EditProduct';
import {domain} from '../../../config';

export default function Cart(props) {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [togelSideNav, setTogelSideNav] = useState(false);
    const [togelAddItem, setTogelAddItem] = useState(false);
    const [togelEditItem, setTogelEditItem] = useState(false);

    const { date, setDate, cartId, isAdmin, categories, editItem, handelAdminEdited } = props;

    useEffect(() => {
        if (isAdmin && editItem) {
            setTogelEditItem(true);
        }

        if (!isAdmin && cartId > 0) {
            fetch(`${domain}/cartItem/${cartId}`)
                .then(res => res.json())
                .then(data => setData(data))
                .catch(err => alert(err))

            fetch(`${domain}/toatlAmount/${cartId}`)
                .then(res => res.json())
                .then(data => {
                    setTotal(data);
                    globalData.totalPrice = data;
                    globalData.cartId = cartId;
                })
                .catch(err => alert(err))
        }
    }, [date, cartId, editItem])

    function deleteBusket() {
        fetch(`${domain}/cart`, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartId })
        })
            .then(res => { res.json() })
            .then(() => {
                setDate(new Date());
            })
            .catch(err => alert(err))
    }

    function onAdminAdded() {
        setTogelAddItem(false);
    }

    function onAdminEtided() {
        setTogelEditItem(false);
    }


    return (
        <div>
            <Nav className={togelSideNav ? "small-sidebar" : "sidebar"}>
                {!isAdmin &&
                    <>
                        <button className="toggel-open-btn" onClick={() => setTogelSideNav(false)}>
                            <i className="big arrow alternate circle right icon"></i>
                        </button>

                        <button className="toggel-close-btn" onClick={() => setTogelSideNav(true)}>
                            <i className="big arrow alternate circle left icon"></i>
                        </button>

                        <div className={togelSideNav ? "hidden-nav-content" : "nav-content"} >
                            <h3>העגלה שלי</h3>
                            {data.length > 0 && <span className="delete-basket">
                                <button className="ui blue button" style={{ marginLeft: "10px" }} onClick={deleteBusket}>רוקן סל</button>
                            </span>}
                            <hr className="hr1" />
                            {data.length === 0 && <p>העגלה שלך ריקה</p>}
                            <div className="cart-content">
                                {data.map(item => {
                                    return (
                                        <div className="ui small segment" key={item.id} style={{ background: 'none',display:'inline-block' }}>
                                            <ProductButton item={item.item} defaultValue={item.amount} setDate={setDate} cartId={cartId} parent='cart' />
                                            <div className="product-name" title={item.item.name}>{item.item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="bottom-nav">
                                {data.length > 0 &&
                                 <div className="ui left action input" style={{ marginLeft: "5px" }}>
                                    <Link className="ui blue labeled icon button " to="/order" >
                                        <i className=" cart icon "></i>
                                        הזמן
                                    </Link>
                                    <input disabled type="text" value={`₪ ${total}`} />
                                </div>}
                            </div>
                        </div>
                    </>
                }

                {
                    isAdmin &&
                    <div>
                        <button className="ui green button" onClick={() => { setTogelAddItem(true); setTogelEditItem(false); handelAdminEdited(); }}>הוסף מוצר</button>
                        {togelAddItem &&
                            <AddProduct categories={categories}
                                setDate={setDate} onAdminAdded={onAdminAdded}
                                onAdminEtided={onAdminEtided} />
                        }

                        {togelEditItem &&
                            <EditProduct editItem={editItem}
                                setDate={setDate}
                                handelAdminEdited={handelAdminEdited} onAdminAdded={onAdminAdded} />
                        }
                    </div>
                }
            </Nav>
        </div >
    )
}