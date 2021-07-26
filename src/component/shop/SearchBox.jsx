import React from 'react';
import { useState } from 'react';

export default function SearchProduct(props) {
    const [search, setSearch] = useState('');
    return (
        <div>
            <form onSubmit={e => { e.preventDefault(); !props.handelSearch && props.onClick(search) }} className="form-inline" dir="rtl" style={{ marginLeft: '5px', position: 'absolute', top: '8px' }}>
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="חפש"
                    aria-label="Search"
                    onKeyUp={props.handelSearch}
                    onChange={e => { setSearch(e.target.value) }}
                    required
                />
                <button
                    className="btn btn-outline my-2 my-sm-0" style={{ color: "black", borderColor: "blue" }}
                    type="submit"
                >
                    חפש
                </button>
            </form>
        </div>
    )
}