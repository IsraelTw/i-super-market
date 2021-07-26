import React from 'react';

export default function Approval(props) {
    const { Decline, content,onApproved } = props;
    return (
        <div className="ui cards" style={{ position: 'absolute', top: '50%', left: '40%' }}>
            <div className="card">
                <div className="content">
                    <div className="description" >{content}</div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui basic green button" onClick={onApproved}>אישור</div>
                            {Decline && <div className="ui basic red button">ביטול</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}