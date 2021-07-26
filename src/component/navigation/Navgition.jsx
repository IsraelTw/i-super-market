import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Navgition({ isLogeedIn, currentUser }) {
    return (
        <nav className="navbar navbar-light bg-light justify-content-evenly" id="main-nav">
            {!isLogeedIn && <>
                <Link to='/'>כניסה</Link>
                <Link to='/Register'>הרשמה</Link>
            </>}

            {isLogeedIn && <>
                <span className="navbar-brand">{currentUser && <>שלום <b>{currentUser.name}</b></>}
                    <Link to='/logout'> <i title="התנתק" className="sign-out icon"></i></Link>
                </span>
                <Link to='/categories/1/product'>מוצרים</Link>
            </>}
            <Link to='/about'>אודות</Link>
        </nav>
    )
}