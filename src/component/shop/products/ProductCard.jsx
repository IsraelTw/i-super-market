import React from 'react';
import './ProductCard.css'

export default function ProductCard(props) {
    const { item, handelAdminClick, isAdmin } = props;

    return (
        <div className="product-card" key={item.id}
            onClick={isAdmin ? () => handelAdminClick(item) : null}
            style={isAdmin ? { cursor: 'pointer' } : null}>
            <div className="card-img" style={{ backgroundImage: `url(${item.image})`, }}>
            </div>
            <div className="card-content">
                <p >{item.name}</p>
                <p id='p'>{item.price} ₪ ל{item.unitOfMeasurement}</p>
                <span className="span-btn">{props.children}</span>
            </div>
        </div>
    )
}