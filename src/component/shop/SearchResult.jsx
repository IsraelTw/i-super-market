import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ProductCard from './products/ProductCard';
import ProductButton from './products/ProductButton';
import {domain} from '../../config';

export default function SearchResult({ cartId, date, setDate }) {
    const [searchResult, setSearchResult] = useState([])
    const { name} = useParams();

    useEffect(() => {
        fetch(`${domain}/item/${name}/${cartId}`)
            .then(res => res.json())
            .then(data => setSearchResult(data))
            .catch(err => console.log(err))
    }, [date,name])
   

    return (
        <div className="product-cards">
            {searchResult.map((item) => {
                return (
                    <ProductCard item={item} key={item.id}>
                        <ProductButton
                            defaultValue={item.itemCarts.length > 0 ?
                                item.itemCarts[0].amount : 0}
                            item={item} cartId={cartId} setDate={setDate} />
                    </ProductCard>
                )
            })}
        </div>
    )
}
