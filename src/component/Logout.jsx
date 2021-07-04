import { useEffect } from 'react';
import { useHistory } from 'react-router';

export default function Logout({ setIsLogeedIn }) {
    const history = useHistory();
    useEffect(() => {
        setIsLogeedIn(false);
        localStorage.removeItem('auth');
        history.push('/');
    }, [])
    return (
        <div>

        </div>
    )
}