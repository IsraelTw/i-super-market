import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navgition from './component/navigation/Navgition';
import Register from './component/registration/Register';
import Login from './component/registration/Login';
import Logout from './component/Logout';
import Categories from './component/shop/categories/Categories';
import Order from './component/shop/order/Order';
import About from './component/About';

function App() {
  const history = useHistory();

  const currentUser = JSON.parse(localStorage.getItem('auth'));

  const [isLogeedIn, setIsLogeedIn] = useState(null);

  useEffect(() => {
    if (currentUser) {
      currentUser.isAuth ? setIsLogeedIn(true) : setIsLogeedIn(false);
      history.push('/categories');
    }

  }, [isLogeedIn])

  function onUserSumbit() {
    setIsLogeedIn(true)
  }

  return (
    <div className="App">
      <Navgition isLogeedIn={isLogeedIn} currentUser={currentUser} />
      <Switch>
        <Route exact path='/' ><Login onUserSumbit={onUserSumbit} /></Route>
        <Route path='/register' ><Register /></Route>
        <Route path='/logout' ><Logout setIsLogeedIn={setIsLogeedIn} /></Route>
        <Route path='/categories' ><Categories /></Route>
        <Route path="/order"><Order /></Route>
        <Route path="/about"><About /></Route>
      </Switch>
    </div >
  );
}
export default App;