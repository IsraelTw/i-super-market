import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './Product.css';
import Button from './Button';
import ProductCard from './ProductCard';
export default function ProductList(props) {
    const history = useHistory();
    const productName = useRef(null);
    let { date, setDate, cartId } = props;
    const [items, setItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        // if (!productName.current.value) {
        fetch(`http://localhost:3002/items/${id}/${cartId}`)
            .then(res => res.json())
            .then(data => { console.log(data); setItems(data) })
            .catch(err => console.log(err))
        // }
        // productName.current.value = null;
    }, [id, date])

    function searchProduct() {
        let id = productName.current.value;

        fetch(`http://localhost:3002/item/${id}/${cartId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                history.push(`/categories/${data[0].categoryId}/product`);
                setItems(data)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <div className="search" style={{ display: 'flex', justifyContent: "flex-end" }}>
                <button id="search-btn" onClick={searchProduct} ></button>
                <input type="text" ref={productName} />
            </div>
            <div className="product-cards">
                {items.map((item) => {
                    return (
                        <ProductCard item={item}>
                            <Button
                                defaultValue={item.itemCarts.length > 0 ?
                                    item.itemCarts[0].amount : 0}
                                item={item} cartId={cartId} setDate={setDate} />
                        </ProductCard>
                    )
                })}
            </div>
        </div >
    )
}