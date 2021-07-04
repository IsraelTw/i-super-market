import { useState } from 'react';

export default function AddProduct(props) {
    const { state, setA } = props;

    const [item, setitem] = useState({});

    async function addProduct() {
        try {
            let data = await fetch(`http://localhost:3002/item`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            })
            data = await data.json();
            console.log(data);
        }
        catch (err) { console.log(err) }
        setA(false);
    }

    return (
        <div>
            <form className="form-admin" dir='rtl'>
                קטגוריה <select onChange={e => setitem({ ...item, categoryId: e.target.value })}>
                    {state.catagory.map(item => {
                        return (
                            <option value={item.id} key={item.id}>{item.name}</option>
                        )
                    })}
                </select><br />
                שם מוצר <input type="text" onChange={e => { setitem({ ...item, name: e.target.value }) }} /> <br />
                מחיר<input type="text" onChange={e => { setitem({ ...item, price: e.target.value }) }} /> <br />
                תמונה<input type="text" onChange={e => { setitem({ ...item, image: e.target.value }) }} /> <br />
                יחידת מידה<select onChange={e => { setitem({ ...item, unitOfMeasurement: e.target.value }) }} >
                    <option value='יחידה'>יחידה</option>
                    <option value={'ק"ג'} >ק"ג</option>
                </select> <br />
                <button type='button' onClick={addProduct}>add</button>
            </form>
        </div>
    )
}