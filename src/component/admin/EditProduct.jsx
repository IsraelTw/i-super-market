import { useState, useEffect } from "react";
import {domain} from '../../config';

export default function EditProduct(props) {
    const { editItem, setDate, handelAdminEdited, onAdminAdded } = props;
    const [item, setItem] = useState(null);

    useEffect(() => {
        onAdminAdded();
        setItem(editItem);
    }, [editItem])

    function editProduct() {

        fetch(`${domain}/item`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .catch(err => console.log('Error ', err))

        handelAdminEdited();

        setTimeout(() => {
            setDate(new Date());
        }, 100);
    }

    return (
        <div>
            {item &&
                <form className="form-admin" dir='rtl'>
                    שם מוצר: <input type="text"
                        value={item.name}
                        onChange={e => { setItem({ ...item, name: e.target.value }) }}
                    /><br />

                    מחיר: <input type="text" value={item.price}
                        onChange={e => { setItem({ ...item, price: e.target.value }) }}
                    /><br />

                    תמונה: <input type="text"
                        value={item.image}
                        onChange={e => { setItem({ ...item, image: e.target.value }) }}
                    /><br />

                    יחידת מידה: <input type="text"
                        value={item.unitOfMeasurement}
                        onChange={e => { setItem({ ...item, unitOfMeasurement: e.target.value }) }}
                    /><br />
                    <button className="ui blue button" type="button" onClick={editProduct}>אישור</button>
                </form>
            }
        </div>
    )
}