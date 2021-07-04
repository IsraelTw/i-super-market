import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap'
import Cart from './Cart';

export default function ManageProdoct() {
    const [state, setState] = useState({ catagory: [], product: [], item: {} });
    const [isEdit, setIsEdit] = useState(false);
    const [toggel, setToggel] = useState(false);
    useEffect(() => {
        fetch(`http://localhost:3002/category`)
            .then(res => res.json())
            .then(data => setState({ ...state, catagory: data }))
            .catch(err => alert(err))
    }, [isEdit, toggel])

    function handelClick(id) {
        fetch(`http://localhost:3002/items/${id}`)
            .then(response => response.json())
            .then(data => setState({ ...state, product: data }))
            .catch(err => alert(err))
    }

    function fn(data) {
        setToggel(!toggel);
        setState({ ...state, item: data });
        setIsEdit(true);
        console.log(state);
    }

    return (
        <div>
            <Cart state={state} setState={setState} isEdit={isEdit} setIsEdit={setIsEdit} toggel={toggel} setToggel={setToggel} />
            <ul style={{ maxWidth: '60%', display: 'inline-block', position: 'static' }}>
                {state.catagory.map(item => {
                    return (
                        <li key={item.id}
                            style={{ marginLeft: '15px', fontSize: '25px' }}>
                            <a onClick={() => handelClick(item.id)}>{item.name}</a>
                        </li>
                    )
                })}
            </ul>
            {state.product.map(item => {
                const { image, name, price, unitOfMeasurement } = item;
                return (
                    <Card key={item.id} onClick={() => fn(item)} style={{ cursor: 'pointer' }}>
                        <Card.Img className="img" variant="top" src={image} />
                        <Card.Body>
                            <p >{name}</p>
                            <p id='p'>₪{price} ל{unitOfMeasurement}</p>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}