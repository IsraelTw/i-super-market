import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './ProductList.css';
import ProductButton from './ProductButton';
import ProductCard from './ProductCard';
import {domain} from '../../../config';

export default function ProductList(props) {
    
    let { date, setDate, cartId, isAdmin,handelAdminClick } = props;

    const [items, setItems] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${domain}/items/${id}/${cartId}`)
            .then(res => res.json())
            .then(data => { setItems(data) })
            .catch(err => console.log(err))
    }, [id, date])

  

    return (
        <div>
            <div className="product-cards">
                {items.map((item) => {
                    return (
                        <div className="column" key={item.id}>
                            <ProductCard item={item}  handelAdminClick={handelAdminClick} isAdmin={isAdmin}>
                                {isAdmin === false && <ProductButton
                                    defaultValue={item.itemCarts.length > 0 ?
                                        item.itemCarts[0].amount : 0}
                                    item={item} cartId={cartId} setDate={setDate} />}
                            </ProductCard>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}