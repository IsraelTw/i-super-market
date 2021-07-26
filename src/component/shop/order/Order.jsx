import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './Order.css';
import { globalData } from '../global-data';
import useFetch from '../../custum hooks/useFetch';
import Invoice from '../Invoice';
import SearchBox from '../SearchBox';
import Approval from '../Approval';
import {domain} from '../../../config';

export default function Order() {
    const { cartId, totalPrice } = globalData;
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('auth'));

    const [order, setOrder] = useState({
        userId: user.id, totalPrice, city: null,
        street: null, shippingDate: null, creditCard: null, cartId
    });

    const [search, setSearch] = useState(null);
    const [showRecit, setShowRecit] = useState(false);
    const [showApproval, setShowApproval] = useState(false);

    const [errorMsg, setErrorMsg] = useState({ shippingDate: false });


    const data = useFetch(`${domain}/user/${user.id}`);
    const items = useFetch(`${domain}/cartItem/${cartId}`);
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

        fetch(`${domain}/order/${value}`)
            .then(res => res.json())
            .then(data => {
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
        e.preventDefault();

        fetch(`${domain}/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
            .then(() => setShowApproval(true))
            .catch(err => console.log('Error ', err))
    }

    function handelSearch(e) {
        setSearch(e.target.value);
    }

    const ApprovalContent = <div>
        <span> לקוח יקר, תודה על קנייתך. להורדת הקבלה לחץ</span>
        <span style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setShowRecit(true)}> כאן</span>
    </div>

    function onApproved() {
        setShowRecit(false);
        setShowApproval(false);
        history.push('/categories');
    }

    return (
        <div>
            <div className="order-basket" dir="rtl">
                <SearchBox handelSearch={handelSearch} onCllick={handelSearch} />
                <Link className="link-to-shop" to="/categories" >חזרה לקניה</Link>
                <table class="ui celled table">
                    <thead class="right aligned">
                        <tr >
                            <th >שם</th>
                            <th>כמות</th>
                            <th>מחיר</th>
                        </tr>
                    </thead>
                    <tbody class="right aligned">
                        {items.map(item => {
                            return (
                                <tr key={item.item.id}>
                                    <td className={search !== '' && item.item.name.includes(search) ? "highlight" : ''}>
                                        {item.item.name}
                                    </td>
                                    <td>{item.amount}</td>
                                    <td> {item.generalPrice} ₪</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Form className='form' dir='rtl' onSubmit={onOrderSubmit}>
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
                <button type="submit" className="ui blue button">השלם הזמנה</button>
            </Form>
            {showApproval && <Approval Decline={false} content={ApprovalContent} onApproved={onApproved} />}
            {showRecit && <Invoice items={items} total={totalPrice} />}
        </div>
    )
}