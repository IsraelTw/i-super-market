import { useState, useEffect } from 'react';
import './Cart.css';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

export default function Cart(props) {
    const { state, isEdit, setIsEdit,toggel,setToggel } = props;
    const [a, setA] = useState(false);
    const [item, setItem] = useState({});

    useEffect(() => {
        if (isEdit) {
            console.log('edit ', isEdit)
            setA(false);
            setItem(state.item);
            setIsEdit(true);
        }
    }, [isEdit,toggel])

    function handelClick() {
        setIsEdit(false);
        setA(true);
    }

    return (
        <div className="adminCart">
            <button className="bt" onClick={handelClick}>+</button>
            <hr />
            {a && <AddProduct state={state} setA={setA} />}

            {isEdit && <EditProduct item={item} setItem={setItem} setIsEdit={setIsEdit} setToggel={setToggel} toggel={toggel} />}
        </div>
    )
}