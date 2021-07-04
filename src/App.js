import 'bootstrap/dist/css/bootstrap.min.css';
import Navgition from './component/navigation/Navgition';
import Register from './component/registration/Register';
import Login from './component/registration/Login';
import Logout from './component/Logout';
import Categories from './component/shop/Categories';
import Order from './component/shop/Order';
import ManageProdoct from './component/admin/ManageProdoct';
import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

function App() {
  const isAuth = JSON.parse(localStorage.getItem('auth'));
  const [isLogeedIn, setIsLogeedIn] = useState(null);

  useEffect(() => {
    isAuth && isAuth.isAuth ? setIsLogeedIn(true) : setIsLogeedIn(false);
  }, [isAuth])
  return (
    <div className="App">
      <Navgition isLogeedIn={isLogeedIn} />
      <Switch>
        <Route exact path='/' ><Login isLogeedIn={isLogeedIn} setIsLogeedIn={setIsLogeedIn} /></Route>
        <Route path='/register' ><Register /></Route>
        <Route path='/logout' ><Logout setIsLogeedIn={setIsLogeedIn} /></Route>
        <Route path='/categories' ><Categories /></Route>
        <Route path="/ManageProduct"><ManageProdoct /></Route>
        <Route path="/order"><Order /></Route>
      </Switch>
    </div >
  );
}
export default App;