import React from 'react';

export default function ProductCard(props) {
    const { item } = props;
    return (
        <div className="card">
            <div className="card-img" style={{ backgroundImage: `url(${item.image})`, }}>
            </div>
            <div className="card-content">
                <p >{item.name}</p>
                <p id='p'>₪{item.price} ל{item.unitOfMeasurement}</p>
                {props.children}
            </div>
        </div>
    )
}