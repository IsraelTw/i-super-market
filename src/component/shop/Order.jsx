import { useState } from 'react';
import { Form } from 'react-bootstrap';
import './Order.css';
import { globalData } from './global-data';
import useFetch from '../custum hooks/useFetch';

export default function Order() {
    const { cartId, totalPrice } = globalData;

    const user = JSON.parse(localStorage.getItem('auth'));
    const [order, setOrder] = useState({
        userId: user.id, totalPrice, city: null,
        street: null, shippingDate: null, creditCard: null
    });

    const [search, setSearch] = useState(null);
    const [errorMsg, setErrorMsg] = useState({
        city: false, street: false, shippingDate: false, creditCard: false
    });


    const data = useFetch(`http://localhost:3002/user/${user.id}`);
    const items = useFetch(`http://localhost:3002/cartItem/${cartId}`);
    const userInfo = data[0]


    function inputAutoComp(e) {
        const { name } = e.target;
        e.target.value = userInfo[name];
        handelChange(e);
    }

    function handelChange(e) {
        const { name, value } = e.target;
        if (name === 'shippingDate') {
            return handelDate(e)
        }
        setOrder({ ...order, [name]: value });
    }

    function handelDate(e) {
        const { name, value } = e.target;
        console.log(e.target.value)

        fetch(`http://localhost:3002/order/${value}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.length > 2) {
                    setOrder({ ...order, [name]: null });
                    setErrorMsg({ ...errorMsg, [name]: true });
                    e.target.value = null;
                    return;
                }
            })
            .catch(() => console.log("Faild to fetch "))
        setOrder({ ...order, [name]: value });
        setErrorMsg({ ...errorMsg, [name]: false });
    }

    function onOrderSubmit(e) {
        e.pravantDefault();
        console.log(order);
        fetch(`http://localhost:3002/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('Error ', err))
    }
    return (
        <div>
            <div className="order-basket" dir="rtl">
                {items.map(item => {
                    return (
                        <div className="order-item" key={item.item.id}>
                            <p id={item.item.id} className={search !== '' && item.item.name.includes(search) ? 'yellow' : ''}>{item.item.name}</p>
                            כמות:<p>{item.amount}</p>
                            מחיר:<p> ₪{item.generalPrice}</p>
                        </div>
                    )
                })}
            </div>

            <Form className='form' dir='rtl' onSubmit={onOrderSubmit}>
                <input type="text"
                    className="form-control"
                    dir="rtl"
                    placeholder="חפש מוצר"
                    onChange={e => setSearch(e.target.value)} />

                <label className='label'>עיר</label>
                <input type="text"
                    required
                    className="form-control"
                    name="city"
                    placeholder="הקש פעמיים למילוי אוטומטי"
                    onDoubleClick={inputAutoComp}
                    onChange={handelChange}
                />

                <label className='label'>רחוב</label>
                <input type="text"
                    required
                    className="form-control"
                    name="street"
                    placeholder="הקש פעמיים למילוי אוטומטי"
                    onDoubleClick={inputAutoComp}
                    onChange={handelChange}
                />

                <label className='label'>תאריך למשלוח</label>
                <input type="date"
                    required
                    className="form-control"
                    name="shippingDate"
                    min={new Date().toISOString().split('T')[0]}
                    max={new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().split('T')[0]}
                    onChange={handelChange}

                />
                {errorMsg.shippingDate && <div style={{ color: 'red', float: 'right', marginBottom: '10px' }}>כל המשלוחים תפוסים ליום זה! </div>}

                <label className='label'>פרטי אשראי</label>
                <input type="text"
                    required
                    className="form-control"
                    name="creditCard"
                    onChange={handelChange}
                />
                <button type="submit">השלם הזמנה</button>
            </Form>
        </div>
    )
}