
export default function EditProduct(props) {
    const { item, setItem, setIsEdit, setToggel, toggel } = props;
    function editProduct() {
        fetch(`http://localhost:3002/item`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log('Error ', err))
        setIsEdit(false);
        setToggel(!toggel);
    }
    return (
        <div>
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
                <button type="button" onClick={editProduct}>ערוך</button>
            </form>
        </div>
    )
}