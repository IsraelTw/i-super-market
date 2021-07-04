import { useState } from 'react';
import { Link, Route, useHistory } from 'react-router-dom';
import Product from './ProductList';
import Cart from './Cart';
import './Cart.css';
import { globalData } from './global-data';
import useFetch from '../custum hooks/useFetch';
export default function Categories() {
    const { cartId } = globalData;

    const [date, setDate] = useState('');

    const categories = useFetch(`http://localhost:3002/category`)

    console.log(categories);

    return (
        <div >
            <Cart date={date} cartId={cartId} setDate={setDate} />
            {categories.map(item => {
                return (
                    <div key={item.id}
                        style={{ marginLeft: '150px', fontSize: '20px',float:'right' }}>
                        <Link to={`/categories/${item.id}/product`}>
                            {item.name}
                        </Link>
                    </div>
                )
            })}
            <Route path='/categories/:id/product' ><Product key={cartId} date={date} setDate={setDate} cartId={cartId} /></Route>
        </div>
    )
}