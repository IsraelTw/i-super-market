import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import ProductList from '../products/ProductList';
import Cart from '../cart/Cart';
import '../cart/Cart.css';
import useFetch from '../../custum hooks/useFetch';
import CategoryNav from './CategoryNav';
import SearchResult from '../SearchResult';
import SearchBox from '../SearchBox';
import { domain } from '../../../config';

export default function Categories() {
    const user = JSON.parse(localStorage.getItem('auth'));
    
    const history = useHistory();

    const [date, setDate] = useState('');
    const [cartId, setCartId] = useState(null);
    const [onSearchActive, setOnSearchActive] = useState(null);
    const [editItem, setEditItem] = useState(null);

    const categories = useFetch(`${domain}/category`)

    useEffect(() => {
        if (user && !user.isAdmin) {
            fetch(`${domain}/cart`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => setCartId(data.id))
                .catch(err => console.log('Error ', err))
        }
        if (!onSearchActive && cartId) {
            history.push('/categories/1/product');
        }
        if (user.isAdmin) { history.push('/categories/1/product'); }
    }, [cartId])

    function handelCategoryClick(id) {
        setOnSearchActive(false);
        history.push(`/categories/${id}/product`);
    };

    function handelSearchSubmit(name) {
        setOnSearchActive(true);
        history.push(`/categories/SearchResult/${name}`)
    }

    function handelAdminClick(item) {
        setEditItem(item);
    }

    function handelAdminEdited() {
        setEditItem(null);
    }

    return (
        <div>
            {user.isAdmin === false &&
                <div className="search" >
                    <SearchBox onClick={handelSearchSubmit} />
                </div>}

            <CategoryNav categories={categories} handelCategoryClick={handelCategoryClick} onSearchActive={onSearchActive} />
            <Cart date={date} cartId={cartId} setDate={setDate}
                isAdmin={user.isAdmin} categories={categories}
                editItem={editItem} handelAdminEdited={handelAdminEdited} />

            <Switch>
                <Route path='/categories/:id/product' >
                    <ProductList date={date} setDate={setDate}
                        cartId={cartId} isAdmin={user.isAdmin}
                        handelAdminClick={handelAdminClick} />
                </Route>
                <Route path="/categories/SearchResult/:name"><SearchResult date={date} setDate={setDate} cartId={cartId} /> </Route>
            </Switch>
        </div>
    )
}