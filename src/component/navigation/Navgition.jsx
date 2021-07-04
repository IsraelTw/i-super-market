import './Navigation.css';
import { Link } from 'react-router-dom';

export default function Navgition({ isLogeedIn }) {

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to='/'>Login</Link></li>
                    <li><Link to='/Register'>Register</Link></li>
                    <li><Link to='/Categories'>Categories</Link></li>
                    {isLogeedIn && <li><Link to='/logout'>log out</Link> </li>}
                </ul>
            </nav>
        </div>
    )
}